const { getTotalProfit, getProfitForCrop, getRevenueForCrop, getCostsForCrop, getYieldForPlant, getYieldForCrop, getTotalYield } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("Define crop objects WITHOUT environmantal factors", () => {
    const corn = {
        name: "corn",
        yield: 6,
        cost: 0.5,
        salePrice: 0.75
    };
    const apple = {
        name: "apple",
        yield: 2,
        cost: 1.25,
        salePrice: 3
    };
    const asparagus = {
        name: "asparagus",
        yield: 6,
        cost: 9,
        salePrice: 12
    };
    const potato = {
        name: "potato",
        yield: 10,
        cost: 1.50,
        salePrice: 2
    };
    const cauliflower = {
        name: "cauliflower",
        yield: 4,
        cost: 1.50,
        salePrice: 2.50
    };
    const mango = {
        name: "mango",
        yield: 20,
        cost: 2,
        salePrice: 2.50
    };

    describe("getCostsForCrop", () => {
        test("Get cost for corn", () => {
            const input = {
                crop: corn,
                numCrops: 230
            }
            expect(getCostsForCrop(input)).toBe(115)
        });
        test("Get cost for asparagus", () => {
            const input = {
                crop: asparagus,
                numCrops: 500
            }
            expect(getCostsForCrop(input)).toBe(4500);
        });
        test("Get cost for cauliflower", () => {
            const input = {
                crop: cauliflower,
                numCrops: 50
            }
            expect(getCostsForCrop(input)).not.toBe(200);
        });
    })

    describe("getRevenueForCrop", () => {
        test("Get revenue for apple", () => {
            const input = {
                crop: apple,
                numCrops: 320
            }
            expect(getRevenueForCrop(input)).toBe(1920)
            //= 3 * (320*2) = 1920
        });
        test("Get revenue for mango", () => {
            const input = {
                crop: mango,
                numCrops: 10
            }
            expect(getRevenueForCrop(input)).toBe(500);
            //= 2.50 * (20*10) = 500
        });
        test("Get revenue for asparagus", () => {
            const input = {
                crop: asparagus,
                numCrops: 60
            }
            expect(getRevenueForCrop(input)).not.toBe(4300);
            //expected = 12 * (6*60) = 4320
        });
    })

    describe("getProfitForCrop", () => {
        test("Get profit for corn", () => {
            const input = {
                crop: corn,
                numCrops: 230
            }
            expect(getProfitForCrop(input)).toBe(920) //revenue = 1035, costs = 115
        });
        test("Get profit for mango", () => {
            const input = {
                crop: mango,
                numCrops: 5
            }
            expect(getProfitForCrop(input)).toBe(240); //revenue = 250, costs = 10
        });
        test("Get profit for cauliflower", () => {
            const input = {
                crop: cauliflower,
                numCrops: 12
            }
            expect(getProfitForCrop(input)).toBe(102); //revenue = 120, costs = 18
        });
    })

    describe("getTotalProfit", () => {
        test("Get profit for corn, apple and asparagus", () => {
            const crops = [
                { crop: corn, numCrops: 230 },
                { crop: apple, numCrops: 320 },
                { crop: asparagus, numCrops: 60 },
            ]
            expect(getTotalProfit(crops)).toBe(6220)
            //corn revenue = 1035 - 115 = 920
            //apple revenue = 1920 - 400 = 1520
            //asparagus revenue = 4320 - 540 = 3780
        });
        test("Get profit for cauliflower, potato and mango", () => {
            const crops = [
                { crop: cauliflower, numCrops: 12 },
                { crop: potato, numCrops: 60 },
                { crop: mango, numCrops: 5 },
            ]
            expect(getTotalProfit(crops)).toBe(1452);
            //cauliflower revenue = 120 - 18 = 102
            //potato revene = 1200 - 90 = 1110
            //mango revenue = 250 - 10 = 240
        });
    })
})


describe("Define crop objects WITH environmantal factors", () => {
    const corn = {
        name: "corn",
        yield: 6,
        cost: 0.5,
        salePrice: 0.75,
        factor: {
            sun: {
                low: -30,
                medium: 0,
                high: 50,
            },
            rain: {
                low: -20,
                medium: 0,
                high: -50
            },
            wind: {
                low: 25,
                medium: 0,
                high: -15
            }
        }
    };
    const apple = {
        name: "apple",
        yield: 2,
        cost: 1.25,
        salePrice: 3,
        factor: {
            wind: {
                low: 5,
                medium: 0,
                high: -25
            },
            insects: {
                low: 0,
                medium: -10,
                high: -75
            }
        }
    };
    const asparagus = {
        name: "asparagus",
        yield: 6,
        cost: 9,
        salePrice: 12,
        factor: {
            sun: {
                low: -40,
                medium: 0,
                high: 75
            },
            temperature: {
                low: -25,
                medium: 0,
                high: -25
            },
            rain: {
                low: -20,
                medium: 0,
                high: -50
            }
        }
    };
    const potato = {
        name: "potato",
        yield: 10,
        cost: 1.50,
        salePrice: 2,
        factor: {
            rain: {
                low: 10,
                medium: 0,
                high: -10
            },
            insects: {
                low: 0,
                medium: -10,
                high: -75
            }
        }
    };
    const cauliflower = {
        name: "cauliflower",
        yield: 4,
        cost: 1.50,
        salePrice: 2.50,
        factor: {
            wind: {
                low: 5,
                medium: 0,
                high: -25
            },
            temperature: {
                low: 20,
                medium: 0,
                high: -50
            }
        }
    };
    const mango = {
        name: "mango",
        yield: 20,
        cost: 2,
        salePrice: 2.50,
        factor: {
            humidity: {
                low: -10,
                medium: 0,
                high: 30
            },
            sun: {
                low: -40,
                medium: 0,
                high: 75
            },
            insects: {
                low: 0,
                medium: -20,
                high: -60
            },
            temperature: {
                low: -80,
                medium: -20,
                high: 0
            }
        }
    };

    const environmentFactors1 = {
        sun: "low",
        rain: "high",
        wind: 'medium',
        insects: 'low',
        temperature: 'low',
        humidity: 'high'
    };

    const environmentFactors2 = {
        sun: "medium",
        rain: "low",
        wind: 'medium',
        insects: 'high',
        temperature: 'medium',
        humidity: 'medium'
    };

    describe("getYieldForCrop", () => {
        test("Get yield for mango", () => {
            const input = {
                crop: mango,
                numCrops: 5
            };
            expect(getYieldForCrop(input, environmentFactors1)).toBe(15.6);
            //(20 * 130% * 60% * 100% * 20%) * 5 = 3.12 * 5
        });
        test("Get yield for mango with other values for the environment factors", () => {
            const input = {
                crop: mango,
                numCrops: 5
            };
            expect(getYieldForCrop(input, environmentFactors2)).toBe(32);
            //(20 * 100% * 100% * 40% * 80%) * 5 = 6.4 * 5 = 32
        })
        test("Get yield for potato", () => {
            const input = {
                crop: potato,
                numCrops: 60
            }
            expect(getYieldForCrop(input, environmentFactors2)).toBe(165)
            //(10 * 110% * 25%) * 60 = 2.75 * 60
        });
    });

    describe("getTotalYield", () => {
        test("Calculate total yield with multiple crops", () => {
            const crops = [
                { crop: corn, numCrops: 230 },
                { crop: cauliflower, numCrops: 12 }
            ];
            expect(getTotalYield({ crops }, environmentFactors1)).toBe(540.6);
            // yield corn = (6 * 70% * 50% * 100%) * 230 = 2.1 * 230 = 483
            // yield cauliflower = (4 * 100% * 120%)*  12 = 4.8 * 12 = 57.6
        });

        test("Calculate total yield with same crops but different environment factors", () => {
            const crops = [
                { crop: corn, numCrops: 230 },
                { crop: cauliflower, numCrops: 12 }
            ];
            expect(getTotalYield({ crops }, environmentFactors2)).toBe(1152);
            // yield corn = (6 * 100% * 80% * 100%) * 230 = 4.1 * 230 = 1104
            // yield cauliflower = (4 * 100% * 100%) * 12 = 4 * 48 = 48
        });
    });

    describe("getRevenueForCrop", () => {
        test("Get revenue for apple", () => {
            const input = {
                crop: apple,
                numCrops: 320
            }
            expect(getRevenueForCrop(input, environmentFactors1)).toBe(1920)
            //= (2 * 100% * 100%) * (320 * 3) = 2 * 960
        });
        test("Get revenue for apple with different environment factors", () => {
            const input = {
                crop: apple,
                numCrops: 320
            }
            expect(getRevenueForCrop(input, environmentFactors2)).toBe(480);
            //= (2 * 100% * 25%) * (320 * 3) = 0.5 * 960
        });
        test("Get revenue for asparagus", () => {
            const input = {
                crop: asparagus,
                numCrops: 60
            }
            expect(getRevenueForCrop(input, environmentFactors1)).toBe(972);
            //= (6 * 60% * 75% * 50%) * (60 * 12) = 1.35 * 720
        });
        test("Get revenue for asparagus with different environment factors", () => {
            const input = {
                crop: asparagus,
                numCrops: 60
            }
            expect(getRevenueForCrop(input, environmentFactors2)).toBe(3456);
            // = (6 * 100% * 100% * 80%) * (60 * 12) = 4.8 * 720 
        });
    })

    describe("getProfitForCrop", () => {
        test("Get profit for corn", () => {
            const input = {
                crop: corn,
                numCrops: 230
            }
            expect(getProfitForCrop(input, environmentFactors1)).toBe(247.25)
            // Revenue = (6 * 70% * 50% * 100%) * (230 * 0.75) = 2.1 * 172.5 = 362.25
            // Costs = 230 * 0.5 = 115
        });
        test("Get profit for corn with different environment factors", () => {
            const input = {
                crop: corn,
                numCrops: 230
            }
            expect(getProfitForCrop(input, environmentFactors2)).toBe(713)
            // Revenue = (6 * 100% * 80% * 100%) * (230 * 0.75) = 4.8 * 172.5 = 828
            // Costs = 230 * 0.5 = 115
        });
        test("Get profit for mango", () => {
            const input = {
                crop: mango,
                numCrops: 5
            }
            expect(getProfitForCrop(input, environmentFactors1)).toBe(29);
            // Revenue = (20 * 130% * 60% * 100% * 20%) * (5 * 2.50) = 3.12 * 12.5 = 39
            // Costs = 5 * 2 = 10
        });
        test("Get profit for mango with different environment factors", () => {
            const input = {
                crop: mango,
                numCrops: 5
            }
            expect(getProfitForCrop(input, environmentFactors2)).toBe(70);
            // Revenue = (20 * 100% * 100% * 40% * 80%) * (5 * 2.50) = 6.4 * 12.5 = 80
            // Costs = 5 * 2 = 10
        });
        test("Get profit for cauliflower", () => {
            const input = {
                crop: cauliflower,
                numCrops: 12
            }
            expect(getProfitForCrop(input, environmentFactors1)).toBe(126);
            // Revenue = (4 * 100% * 120%) * (12 * 2.50) = 4.8 * 30 = 144
            // Costs = 12 * 1.50 = 18
        });
        test("Get profit for cauliflower with different environment factors", () => {
            const input = {
                crop: cauliflower,
                numCrops: 12
            }
            expect(getProfitForCrop(input, environmentFactors2)).toBe(102);
            // Revenue = (4 * 100% * 100% ) * (12 * 2.50) = 4 * 30 = 120
            // Costs = 12 * 1.50 = 18
        });
    })

    describe("getTotalProfit", () => {
        test("Get profit for corn, apple and asparagus", () => {
            const crops = [
                { crop: corn, numCrops: 230 },
                { crop: apple, numCrops: 320 },
                { crop: asparagus, numCrops: 60 },
            ]
            expect(getTotalProfit(crops, environmentFactors1)).toBe(2199.25)
            // Corn --> Profit = 247.25
            // Apple --> Profit = 1920 - (320 * 1.25) = 1920 - 400 = 1520
            // Asparagus --> Profit = 972 - (60 * 9) = 972 - 540 = 432
        });
        test("Get profit for corn, apple and asparagus with different environment factors", () => {
            const crops = [
                { crop: corn, numCrops: 230 },
                { crop: apple, numCrops: 320 },
                { crop: asparagus, numCrops: 60 },
            ]
            expect(getTotalProfit(crops, environmentFactors2)).toBe(3709)
            // Corn --> Profit = 713
            // Apple --> Profit = 480 - (320 * 1.25) = 480 - 400 = 80
            // Asparagus --> Profit = 3456 - (60 * 9) = 3456 - 540 = 2916
        });
        test("Get profit for cauliflower, potato and mango", () => {
            const crops = [
                { crop: cauliflower, numCrops: 12 },
                { crop: potato, numCrops: 60 },
                { crop: mango, numCrops: 5 },
            ]
            expect(getTotalProfit(crops, environmentFactors1)).toBe(1145)
            // Cauliflower --> Profit = 126
            // Potato --> 
            //              Revenue = (10 * 90% * 100%) * (60 * 2) = 9 * 120
            //              Costs = 60 * 1.50
            //              Profit = 1080 - 90 = 990
            // Mango --> Profit = 29
        });
        test("Get profit for cauliflower, potato and mango with different environment factors", () => {
            const crops = [
                { crop: cauliflower, numCrops: 12 },
                { crop: potato, numCrops: 60 },
                { crop: mango, numCrops: 5 },
            ]
            expect(getTotalProfit(crops, environmentFactors2)).toBe(412)
            // Cauliflower --> Profit = 102
            // Potato --> 
            //              Revenue = (10 * 110% * 25%) * (60 * 2) = 2.75 * 120
            //              Costs = 60 * 1.50
            //              Profit = 330 - 90 = 240
            // Mango --> Profit = 70
        });
    })
})


