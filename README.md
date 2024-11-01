
# SNIL: Generating Sports News from Insights with Large Language Models


## Introduction

We have developed a system, SNIL, for the interaction bewteen users, templates, and ChatGPT. The system allows users to modify the orders of episode and the configuration of visualizations. SNIL regards the user input as an information and logic source instead of a visualization command, allowing for interactive editing and logical interpolation by the user, thus making the generated content of the model controllable. In summary, the primary contributions are as follows.

*•* A preliminary study that reviews 120 selected sports news and summarizes design considerations for the generation.

*•* A workflow that enables the automatic generation of the whole article based on user insight.

*•* A system, SNIL, that supports human-machine cooperative generation of basketball news.

*•* A user studies that validate the utility and application scenarios of the proposed workflow.

## Abstract

To enhance the engagement and informativeness of journalism, there is an increasing reliance on data analysis techniques and visualizations, which poses a high demand on journalists’ abilities. While numerous visual analytics systems have been developed for deriving insights, few tools specifically cater to support and disseminate viewpoints for journalism production. Thus, this work aims to facilitate the automatic creation of sports journalism from the insights expressed by natural languages. To achieve this, we conducted an extensive preliminary study on the published sports news. Based on our findings, we propose a workflow - 1) exploring the data space behind insights, 2) generating narrative structures, 3) progressively generating each episode, and 4) mapping data spaces into communicative visualizations. To customize journalism, we have implemented a human-AI interaction system called SNIL, which incorporates user input in conjunction with LLMs, utilizing an atomized approach to modify the textual and graphical contents within the episode-based structure. We conduct user studies to demonstrate the usability of SNIL and the benefit of bridging the gap between analysis tasks and communicative tasks through expert and fan feedback.



## Interface and Guidance
The online story editor interface of SNIL. (A) The Data View displays events extracted from insight. (B) The Episode Editor supports editing episode elements. (C) The Storyline View offers an overview of the entire news and allows for narrative structure editing. (D) The Story Visualization View presents the generated news results.

![image](https://github.com/13Lychee/InsightSupporter/blob/main/img/Interface.png)

## File Structure

```
.
│  10_nba_stats_website.csv
│  Appendix.pdf
│  article dataset.xlsx
│  coding book.doc
│  list.txt
│  stats_chartType.xlsx
│  
├─comparative study
│  ├─InsightSupporter
│  │      comcase01.png
│  │      comcase02.png
│  │      comcase03.png
│  │      comcase04.png
│  │      comcase05.png
│  │      
│  └─Origin
│          comcase011.png
│          comcase021.png
│          comcase031.png
│          comcase041.png
│          comcase051.png
│              
│─user study
│       case1.png
│       case2.png
│       case3.png
│       case4.png
│       case5.png
│       case6.png
│       case7.png
│       case8.png
│
├─InsightSupporter_system_code
│  │  videoProcess.py
│  │  
│  ├─actionType
│  │  │  ActionType.txt
│  │  │  clipVideo.py
│  │  │  Clock.py
│  │  │  fetchData.ipynb
│  │  │  queryJson.py
│  │  │  readJson.py
│  │  │  summary.json
│  │  │  timeParse.py
│  │  │  videoProcess.py
│  │          
│  ├─chatGPT
│  │  │  answer.txt
│  │  │  article.csv
│  │  │  article_new.csv
│  │  │  article_new2.csv
│  │  │  chat.py
│  │  │  label.csv
│  │  │  main.py
│  │  │  openAI.ipynb
│  │  │  openAI.py
│  │  │  pipeline.ipynb
│  │  │  pipeline.py
│  │  │  svm.ipynb
│  │  │  task.ipynb
│  │  │  task.txt
│  │  │  turn.py
│  │  │  
│  │  └─nltk
│  │                  
│  ├─insighter
│  │  │  package-lock.json
│  │  │  package.json
│  │  │  question.md
│  │  │  README.md
│  │  │  yarn.lock
│  │  │  
│  │  ├─public
│  │  │  │  basketball.jpg
│  │  │  │  basketball.png
│  │  │  │  favicon.ico
│  │  │  │  index.html
│  │  │  │  manifest.json
│  │  │  │  news.svg
│  │  │  │  robots.txt
│  │  │  │  
│  │  │  ├─data
│  │  │  │      Low_Relation.json
│  │  │  │      new_summary.json
│  │  │  │      summary_401360853.json
│  │  │  │      
│  │  │  └─img
│  │  │          court.png
│  │  │          
│  │  └─src
│  │      │  App.css
│  │      │  App.js
│  │      │  App.test.js
│  │      │  Apps.js
│  │      │  index.css
│  │      │  index.js
│  │      │  logo.svg
│  │      │  reportWebVitals.js
│  │      │  setupTests.js
│  │      │  TextArea.js
│  │      │  
│  │      ├─charts
│  │      │  │  aoyun.html
│  │      │  │  area.html
│  │      │  │  bar chart.html
│  │      │  │  flow chat.html
│  │      │  │  linechart.html
│  │      │  │  pie chart.html
│  │      │  │  stacked bar chart.html
│  │      │  │  textchart.html
│  │      │  │  
│  │      │  ├─data
│  │      │  │      Low_Relation.json
│  │      │  │      new_summary.json
│  │      │  │      Strong_Relation.json
│  │      │  │      summary_401360853.json
│  │      │  │      Test.json
│  │      │  │      Test_new.json
│  │      │  │      
│  │      │  ├─shot chart
│  │      │  │  │  home.html
│  │      │  │  │  
│  │      │  │  ├─css
│  │      │  │  │      style.css
│  │      │  │  │      
│  │      │  │  ├─js
│  │      │  │  │      d3-tip.js
│  │      │  │  │      d3.min.js
│  │      │  │  │      shots1.js
│  │      │  │  │      
│  │      │  │  └─readme_img
│  │      │  │          court.png
│  │      │  │          
│  │      │  └─shot chart deprecated
│  │      │      │  home.html
│  │      │      │  
│  │      │      ├─css
│  │      │      │      style.css
│  │      │      │      
│  │      │      ├─js
│  │      │      │      d3-tip.js
│  │      │      │      d3.min.js
│  │      │      │      shots1.js
│  │      │      │      
│  │      │      └─readme_img
│  │      │              court.png
│  │      │              
│  │      ├─components
│  │      │  ├─charts
│  │      │  │  │  areachart.js
│  │      │  │  │  barchart.js
│  │      │  │  │  ChartGenerate.js
│  │      │  │  │  flowchart.js
│  │      │  │  │  flowGame.js
│  │      │  │  │  isotypechart.js
│  │      │  │  │  linechart.js
│  │      │  │  │  piechart.js
│  │      │  │  │  Relationship.js
│  │      │  │  │  stackedBarChart.js
│  │      │  │  │  textchart.js
│  │      │  │  │  
│  │      │  │  ├─Shot
│  │      │  │  │  │  Shot.js
│  │      │  │  │  │  
│  │      │  │  │  ├─css
│  │      │  │  │  │      style.css
│  │      │  │  │  │      
│  │      │  │  │  ├─img
│  │      │  │  │  │      court.png
│  │      │  │  │  │      
│  │      │  │  │  └─js
│  │      │  │  │          d3-tip.js
│  │      │  │  │          d3.min.js
│  │      │  │  │          shots1.js
│  │      │  │  │          
│  │      │  │  └─Table
│  │      │  │          ScoreTable.js
│  │      │  │          Table.css
│  │      │  │          TableData.js
│  │      │  │          
│  │      │  ├─Data
│  │      │  │      Data.css
│  │      │  │      Data.js
│  │      │  │      GameFlow.js
│  │      │  │      
│  │      │  ├─deprecated
│  │      │  │  │  barchart_deprecate.js
│  │      │  │  │  ChartSelect.js
│  │      │  │  │  funareachart.js
│  │      │  │  │  VideoPlayer.js
│  │      │  │  │  
│  │      │  │  ├─MyDropdown
│  │      │  │  │      MyDropdown.css
│  │      │  │  │      MyDropdown.js
│  │      │  │  │      MyDropdown.scss
│  │      │  │  │      
│  │      │  │  └─shot
│  │      │  │      │  shot.js
│  │      │  │      │  shotchart.js
│  │      │  │      │  
│  │      │  │      ├─css
│  │      │  │      │      style.css
│  │      │  │      │      
│  │      │  │      ├─js
│  │      │  │      │      d3-tip.js
│  │      │  │      │      d3.min.js
│  │      │  │      │      shoting.js
│  │      │  │      │      shots1.js
│  │      │  │      │      
│  │      │  │      └─readme_img
│  │      │  │              court.png
│  │      │  │              
│  │      │  ├─Episode
│  │      │  │  │  Episode.css
│  │      │  │  │  Episode.js
│  │      │  │  │  
│  │      │  │  └─SelectPanel
│  │      │  │          CustomSelect.css
│  │      │  │          CustomSelect.js
│  │      │  │          SelectPanel.js
│  │      │  │          Subspace.js
│  │      │  │          
│  │      │  ├─Head
│  │      │  │      DatePickerButton.css
│  │      │  │      DatePickerButton.js
│  │      │  │      Drop.js
│  │      │  │      Head.css
│  │      │  │      Head.js
│  │      │  │      
│  │      │  ├─News
│  │      │  │      News.css
│  │      │  │      News.js
│  │      │  │      Page.css
│  │      │  │      Page.js
│  │      │  │      VideoCarousel.js
│  │      │  │      
│  │      │  ├─Story
│  │      │  │  │  Story.css
│  │      │  │  │  Story.js
│  │      │  │  │  
│  │      │  │  └─GenerateButton
│  │      │  │          GenerateButton.css
│  │      │  │          GenerateButton.js
│  │      │  │          
│  │      │  ├─StoryLine
│  │      │  │      Card.css
│  │      │  │      StoryLine.css
│  │      │  │      StoryLine.js
│  │      │  │      
│  │      │  └─View
│  │      │          View.css
│  │      │          View.js
│  │      │          
│  │      ├─data
│  │      │      Low_Relation.json
│  │      │      new_summary.json
│  │      │      Strong_Relation.json
│  │      │      summary_401360853.json
│  │      │      Test.json
│  │      │      Test_new.json 
│  │      │      
│  │      ├─image
│  │      │      1.png
│  │      │      circle-2.png
│  │      │      
│  │      ├─store
│  │      │      api.js
│  │      │      data.js
│  │      │      index.js
│  │      │      reducer.js
│  │              
│  ├─json
│  │      csvToJson.py
│  │      DataFetcher.py
│  │      fetchData.ipynb
│  │      label.csv
│  │      label.json
│  │      README.md
│  │      summary.json
│  │      
│  ├─NLP
│  │  │  main.py
│  │  │  text.txt
│  │  │  train.sh
│  │  │  tutorial.ipynb
│  │  │  
│  │  ├─config
│  │  │      model_lstm.json
│  │  │      
│  │  ├─data
│  │  │      article.csv
│  │  │      train.csv
│  │  │      validation.csv
│  │  │      
│  │  └─frame
│  │      │  data.py
│  │      │  model.py
│  │      │  multilabel.py
│  │      │  
│  │      └─__pycache__
│  │              data.cpython-310.pyc
│  │              model.cpython-310.pyc
│  │              
│  ├─OCR-Extract-Subtitles-main
│  │  │  analyze_key_frame.py
│  │  │  article-Sheet1.csv
│  │  │  article.csv
│  │  │  clip.py
│  │  │  extract_index_frame.py
│  │  │  main.py
│  │  │  ocr.py
│  │  │  README.md
│  │  │  requirements.txt
│  │  │  svmword.py
│  │  │  test.py
│  │  │  
│  │  ├─pdocr
│  │  │  │  predict.py
│  │  │  │  __init__.py
│  │  │  │  
│  │  │  ├─infer
│  │  │  │  │  predict_det.py
│  │  │  │  │  predict_rec.py
│  │  │  │  │  predict_system.py
│  │  │  │  │  utility.py
│  │  │  │  │  __init__.py
│  │  │  │  │  
│  │  │  │  └─__pycache__
│  │  │  │          predict_det.cpython-310.pyc
│  │  │  │          predict_det.cpython-36.pyc
│  │  │  │          predict_rec.cpython-310.pyc
│  │  │  │          predict_rec.cpython-36.pyc
│  │  │  │          utility.cpython-310.pyc
│  │  │  │          utility.cpython-36.pyc
│  │  │  │          __init__.cpython-310.pyc
│  │  │  │          __init__.cpython-36.pyc
│  │  │  │          
│  │  │  ├─inference
│  │  │  │  ├─mobile_v1.1_det_infer
│  │  │  │  │      model
│  │  │  │  │      params
│  │  │  │  │      
│  │  │  │  └─mobile_v1.1_rec_infer
│  │  │  │          model
│  │  │  │          params
│  │  │  │          
│  │  │  ├─pyocr
│  │  │  │  │  db_postprocess.py
│  │  │  │  │  db_process.py
│  │  │  │  │  __init__.py
│  │  │  │  │  
│  │  │  │  ├─utils
│  │  │  │  │  │  character.py
│  │  │  │  │  │  ch_keys_v1.txt
│  │  │  │  │  │  ic15_dict.txt
│  │  │  │  │  │  utility.py
│  │  │  │  │  │  __init__.py
│  │  │          
│  │  └─videos
│  │          demo0.flv
│  │          
│  ├─paddle
│  │      parse.ipynb
│  │      pdnlp.ipynb
│  │      pdnlp.py
│  │      
│  ├─pipe
│  │      AI.py
│  │      config.py
│  │      main.py
│  │      
│  ├─query
│  │      Clock.py
│  │      queryJson.py
│  │      readJson.py
│  │      summary.json
│  │      timeParse.py
│  │      
│  └─video
│      │  ActionType.txt
│      │  clipVideo.py
│      │  Clock.py
│      │  fetchData.ipynb
│      │  figure.py
│      │  main.py
│      │  ocr.py
│      │  openh264-1.8.0-win64.dll
│      │  queryJson.py
│      │  readJson.py
│      │  summary.json
│      │  timeParse.py
│      │  videoProcess.py
│      │  
│      ├─data
│      │      summary_401360853.json
│      │      
│      ├─pdocr
│      │  │  predict.py
│      │  │  __init__.py
│      │  │  
│      │  ├─infer
│      │  │      predict_det.py
│      │  │      predict_rec.py
│      │  │      predict_system.py
│      │  │      utility.py
│      │  │      __init__.py
│      │  │      
│      │  ├─inference
│      │  │  ├─mobile_v1.1_det_infer
│      │  │  │      model
│      │  │  │      params
│      │  │  │      
│      │  │  └─mobile_v1.1_rec_infer
│      │  │          model
│      │  │          params
│      │  │          
│      │  └─pyocr
│      │      │  db_postprocess.py
│      │      │  db_process.py
│      │      │  __init__.py
│      │      │  
│      │      └─utils
│      │              character.py
│      │              ch_keys_v1.txt
│      │              ic15_dict.txt
│      │              utility.py
│      │              __init__.py      
```



## How to Get Start

```cmd
git@github.com:13Lychee/InsightSupporter.git
cd InsightSupporter
```

##### Optional: create a python virtual environment

- Create a conda environment and install the following main packages.

To avoid python package conflicts, we recommend using a virtual environment, e.g.: using conda or venv:

```
python -m venv InsightSupporter
source venv_InsightSupporter/bin/activate # you need to repeat this step for every new terminal
```

##### Install with pip

```
pip install -r requirements.txt
```

Change your own openai key at openAI.py and pipeline.py

##### Taichi backend (optional not ready)

Use [Taichi](https://github.com/taichi-dev/taichi) backend for Instant-NGP. It achieves comparable performance to CUDA implementation while **No CUDA** build is required. Install Taichi with pip:

```
pip install -i https://pypi.taichi.graphics/simple/ taichi-nightly
```

##### React frontend

First make sure that MongoDB is started and the database configuration is in common/config.js

```cmd
npm install
npm start
```

```cmd
use the test data
./mongorestore -d db  path/db/
```

## Acknowledgement

Our implementation is mainly based on [ChatGPT](https://openai.com/chatgpt) and the following open-source projects:

- [NBA_API](https://github.com/swar/nba_api)
- [Compute to Tell the Tale: Goal-Driven Narrative Generation](https://dl.acm.org/doi/abs/10.1145/3503161.3549202)

## Citation

Not Ready
