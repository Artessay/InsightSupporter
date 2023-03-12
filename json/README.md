# 数据格式

* teams
  * team
    * name
    * logo
    * statistics [FG, Field Goal %, 3PT, Three Point %, FT, ...]
      * displayValue
      * label
* players
  * label (MIN, FG, 3PT, FT, OREB, ...)
  * athletes []
    * name
    * stats (28, 2-6, 1-3, ...)

boxscore []
  item : dict {}
    name
    ..
    statistics []

label
dict
  shot:[1,2,3]
  guard:[]