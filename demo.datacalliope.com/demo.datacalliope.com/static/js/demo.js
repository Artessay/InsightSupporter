import Fact from './model/fact';
import FactType from './constant/FactType'
import RelationType from './constant/RelationType';

const demo = {
    fileName: 'CarSales.csv',
    title: 'Car Sales',
    facts: [
        new Fact(
            FactType.VALUE,
            [{
                "field": "Sales",
                "aggregate": "sum"
            }],
            [],
            [],
            [],
            21921768,
            "",
            0.6000000000000001,
            4.584,
            0.2
        ),
        new Fact(
            FactType.DISTRIBUTION,
            [{
                "field": "Sales",
                "aggregate": "sum"
            }],
            [],
            ['Brand'],
            [],
            "",
            "",
            2.660842202603817,
            4.584, // infomation
            0.886947400867939 // sig
        ),
        new Fact(
            FactType.RANK,
            [
                {
                    "field": "Sales",
                    "aggregate": "sum"
                }
            ],
            [],
            ['Category'],
            [
                { field: "Brand", value: "SUV" },
                { field: "Brand", value: "Midsize" },
                { field: "Brand", value: "Subcompact" },
            ],
            ['SUV', 'Midsize', 'Subcompact'],
            "",
            2.346122155632163,
            4.584,
            0.7820407185440543
        ),
        new Fact(
            FactType.DIFFERENCE,
            [
                {
                    "field": "Sales",
                    "aggregate": "sum"
                }
            ],
            [],
            ['Category'],
            [
                {
                    "field": "Category",
                    "value": "SUV"
                },
                {
                    "field": "Category",
                    "value": "MPV"
                }
            ],
            6764065,
            "",
            5.842,
            5.842,
            1
        ),
        new Fact(
            FactType.TREND,
            [
                {
                    "field": "Sales",
                    "aggregate": "sum"
                }
            ],
            [],
            ['Year'],
            [],
            'decreasing',
            "",
            0.7620131311240704,
            4.584,
            0.2540043770413568
        ),
        new Fact(
            FactType.TREND,
            [
                {
                    "field": "Sales",
                    "aggregate": "sum"
                }
            ],
            [
                {
                    "field": "Brand",
                    "value": "Hyundai"
                }
            ],
            ['Year'],
            [],
            'increasing',
            "",
            4.687874448943144,
            8.044,
            0.7257410134070144
        ),
    ],
    relations: [
        'none',
        RelationType.SIMILARITY,
        RelationType.SIMILARITY,
        RelationType.ELABORATION,
        RelationType.SIMILARITY,
        RelationType.CONTRAST
    ]
}

export default demo