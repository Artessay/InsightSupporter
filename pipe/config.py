input_label = """
Decide a Multilabel classification whether an uterance describing the insight type about NBA stats is a set of target labels (Single Player Performance, Whole Game Review, Strategy and Tactic, About Referee, Accident).
Single player performance is about single player.
Whole game review maybe about Overall team performance,Battle Report,team stats.
Strategy and Tactic maybe about formation,Lineups,Offensive tendencies,Tactic tendencies both offence and defence,Some technical and tactical such as:Elevator door,Ghost pick and roll,isolation
About Referee is about malicious fouls,controversial penalties.
Accident is about some extra thing on or out court, such as injury.
For example,
The insight:(The Utah Jazz have helped Lauri Markkanen unlock his offensive potential, becoming the kind of star they build a new foundation around.) is single player performance, Strategy and tactic;
The insight:(Joel Embiid most shots were taken from mid range and happened in first quarter) is single player performance.
Output labels only.
"""

input_task = """
Decide whether an uterance describing the data fact type is value, difference, proportion, trend, categorization, distribution, rank, association, extreme, or outlier.
Output labels only.
"""

input_what = "In sports, there are clear mappings for the five Ws essential elements. In basketball, for example, there are players, coaches, referees, and teams (who), locations or spaces on the basketball court such as the 3-point line or inside the key (where), distinct times or time periods such as the 4th quarter or 3-minutes left (when), and particular game statistics such as shots, fouls, timeouts, touches, etc. (what). Extract these four elements from the following sentence and response with a formatted answer.\n"

def input_logic(insight:str, task_type:str): 
    return "How to describe the sports news: " + insight + " The analysis task type is " + task_type + ". Thus, How to narrate this data story Streamlined? List the episode titles in this data story (just focus on this game only)"

def input_relation(episode1, episode2):
    "Decide whether the logic relation between two episodes, which were given below pairwise, is elaboration, similarity, generalization, contrast, temporal, or cause-effect."+ episode1 + episode2