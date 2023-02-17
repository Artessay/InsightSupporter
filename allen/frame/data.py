import logging
# from typing_extensions import override
from allennlp.common.file_utils import cached_path
from allennlp.data.dataset_readers.dataset_reader import DatasetReader
from allennlp.data.fields import Field, TextField, LabelField
from allennlp.data.instance import Instance
from allennlp.data.token_indexers import SingleIdTokenIndexer, TokenIndexer
from allennlp.data.tokenizers import Tokenizer, WhitespaceTokenizer
from typing import *
import os

from allennlp.data.tokenizers import Token
import csv

from typing import Dict

# from overrides import overrides

@DatasetReader.register("text_classification")
class TextClassificationReader(DatasetReader):

    def __init__(self,
                 tokenizer: Tokenizer = None,
                 token_indexers: Dict[str, TokenIndexer] = None,
                 delimiter: str = ',',
                 testing: bool = False,
                 max_sequence_length: int = None,
                 lazy: bool = False) -> None:
        """
        文本分类任务的datasetreader,从csv获取数据,head指定text,label.如:
        label   text
        sad    i like it.
        :param tokenizer: 分词器
        :param token_indexers:
        :param delimiter:
        :param testing:
        :param max_sequence_length:
        :param lazy:
        """
        super().__init__(lazy)
        self._tokenizer = tokenizer or WhitespaceTokenizer() # WordTokenizer()
        self._token_indexers = token_indexers or {'tokens': SingleIdTokenIndexer()}
        self._delimiter = delimiter
        self.testing = testing
        self._max_sequence_length = max_sequence_length

    # @override
    def _read(self, file_path: str):
        # if `file_path` is a URL, redirect to the cache
        file_path = cached_path(file_path)
        with open(file_path, 'r') as inputFile:
            reader = csv.DictReader(inputFile)
            
            for row in reader:
                text = str(row.get('Insight', ''))
                label = str(row.get('Insight Type', ''))
                yield self.text_to_instance(text, label)

    # @overrides
    def text_to_instance(self, text: str, label: Union[str, int] = None) -> Instance:
        """
        Parameters
        ----------
        text : ``str``, required.
            The text to classify
        label : ``str``, optional, (default = None).
            The label for this text.
        Returns
        -------
        An ``Instance`` containing the following fields:
            tokens : ``TextField``
                The tokens in the sentence or phrase.
            label : ``LabelField``
                The label label of the sentence or phrase.
        """
        # pylint: disable=arguments-differ
        fields: Dict[str, Field] = {}

        # tokenizer 默认使用了WordTokenizer, WordTokenizer有tokenize方法,返回词列表. splitter作为参数传给tokenizer
        tokenized_text = self._tokenizer.tokenize(text)
        if self._max_sequence_length is not None:
            tokenized_text = self._truncate(tokenized_text)
        
        # TextField接收词列表和token_indexer,侯泽负责解决如何将词转换成编码.
        fields['tokens'] = TextField(tokenized_text, self._token_indexers)
        if label is not None:
            fields['label'] = LabelField(label)

        return Instance(fields)

    def _truncate(self, tokens):
        """
        truncate a set of tokens using the provided sequence length
        """
        if len(tokens) > self._max_sequence_length:
            tokens = tokens[:self._max_sequence_length]
        return tokens