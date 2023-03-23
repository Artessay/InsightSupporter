export default function GetChartData( sentenceList ) {
    let datas = [];
    console.log(sentenceList)

    for (let i = 0; i < sentenceList.length; ++i) {
        if (sentenceList[i].S_Ischart === "Yes") {
            let needs = sentenceList[i].S_Chartneed;
            for (let j = 0; j < needs.length; ++j) {
                datas.push(needs[j])
            }
        }
    }

    return datas;
}