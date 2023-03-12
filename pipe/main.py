import os
from AI import AI

if __name__ == '__main__':
    os.environ["HTTP_PROXY"] = "http://127.0.0.1:7890"
    os.environ["HTTPS_PROXY"] = "http://127.0.0.1:7890"

    insight = 'Joel Embiid most shots were taken from mid range and happened in first quarter.'

    ai = AI()

    # 获取labels
    label = ai.getLabel(insight)
    labels = label.split(", ")
    print(labels)
    # >>> ['Single Player Performance', 'Strategy and Tactic']

    task = ai.getTask(insight)
    tasks = task.split(", ")
    print(tasks)
    # >>> ['Difference']

    what = ai.getWhat(insight)
    print(what)
        
    task_type = tasks[0]
    logic = ai.getLogic(insight, task_type)
    print(logic)

    relation = ai.getRelation("Episode 2: Joel Embiid's Shot Attempts", "Episode 3: Distribution of Shots by Quarter")
    print(relation)