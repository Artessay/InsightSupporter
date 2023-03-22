import FactType from '../constant/FactType';
import ChartType from '../constant/ChartType';

export const fact2visRules = [
    {
        "fact": FactType.ASSOCIATION,
        "chart": ChartType.SCATTER_PLOT,
    },
    {
        "fact": FactType.CATEGORIZATION,
        "chart": ChartType.BUBBLE_CHART,
    },
    // {
    //     "fact": FactType.CATEGORIZATION,
    //     "chart": ChartType.ISOTYPE_BAR_CHART,
    // },
    {
        "fact": FactType.DIFFERENCE,
        "chart": ChartType.VERTICAL_DIFFERENCE_BAR_CHART,
    },
    // {
    //     "fact": FactType.DIFFERENCE,
    //     "chart": ChartType.VERTICAL_DIFFERENCE_ARROW_CHART,
    // },
    // {
    //     "fact": FactType.DIFFERENCE,
    //     "chart": ChartType.TEXT_CHART,
    // },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.COLOR_FILLING_MAP,
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.ISOTYPE_BAR_CHART,
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.VERTICAL_BAR_CHART,
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.BUBBLE_CHART,
    },
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.VERTICAL_BAR_CHART,
    },
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.ISOTYPE_BAR_CHART,
    },
    // {
    //     "fact": FactType.EXTREME,
    //     "chart": ChartType.LINE_CHART,
    // },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.COLOR_FILLING_MAP,
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.AREA_CHART,
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.ISOTYPE_BAR_CHART,
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.VERTICAL_BAR_CHART,
    },
    // {
    //     "fact": FactType.OUTLIER,
    //     "chart": ChartType.LINE_CHART,
    // },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.PROPORTION_ISOTYPE_CHART,
    },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.PROGRESS_BAR_CHART,
    },
    // {
    //     "fact": FactType.PROPORTION,
    //     "chart": ChartType.TEXT_CHART,
    // },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.RING_CHART,
    },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.HALF_RING_CHART,
    },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.PIE_CHART,
    },
    {
        "fact": FactType.RANK,
        "chart": ChartType.HORIZONTAL_BAR_CHART,
    },
    // {
    //     "fact": FactType.RANK,
    //     "chart": ChartType.TEXT_CHART,
    // },
    {
        "fact": FactType.TREND,
        "chart": ChartType.LINE_CHART,
    },
    {
        "fact": FactType.TREND,
        "chart": ChartType.VERTICAL_BAR_CHART,
    },
    {
        "fact": FactType.TREND,
        "chart": ChartType.ISOTYPE_BAR_CHART,
    },
    {
        "fact": FactType.VALUE,
        "chart": ChartType.TEXT_CHART,
    },
]