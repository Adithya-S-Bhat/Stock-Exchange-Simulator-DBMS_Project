\c stockexchange

INSERT INTO brokers VALUES(
    55,
    'Zerodha',
    'www.zerodha.com',
    '#67, High rise Tower, Bengaluru,Karnataka',
    3.00
),(
    66,
    'Upstox',
    'www.upstox.com',
    '#96, Jubliee Building,Mumbai,Maharashtra',
    2.85
),(
    77,
    'Groww',
    'www.groww.com',
    '#21, Bagmane Tech Park, Bengaluru,Karnataka',
    2.42
),(
    88,
    'Angel Broking',
    'www.angelbroking.com',
    '#43, Jubliee hills tech park, Pune,Maharashtra',
    2.98
),(
    99,
    'ICICI Direct',
    'www.icicidirect.com',
    '#101, Sunrise tech park, Chennai,Tamil Nadu',
    3.05
),(
    111,
    'HDFC Securities',
    'www.hdfcsecurities.com',
    '#31, Water globe fundation, Kolkata,West Bengal',
    1.96
),(
    222,
    'Kotak Securities',
    'www.kotaksecurities.com',
    '#44, Kormangala, Bengaluru,Karnatka',
    2.03
),(
    333,
    'Motilal Oswal',
    'www.motilaloswal.com',
    '#203, Capertino foundation, Ashok nagar,Delhi',
    2.42
);

INSERT INTO stocks VALUES(
    10,
    'Tata Motors',
    3012.34,
    9000000,
    'Large Cap',
    0
),(
    20,
    'JK Lakshmi Cement',
    976.66,
    250000,
    'Small Cap',
    0
),(
    30,
    'Cred Inc.',
    1784.89,
    897000,
    'Mid Cap',
    0
),(
    40,
    'Reliance',
    2620.00,
    134110,
    'Large Cap',
    0
),(
    50,
    'Hindustan Uniliver',
    2459.00,
    452881,
    'Large Cap',
    0
),(
    60,
    'Britania',
    3734.42,
    765921,
    'Large Cap',
    0
),(
    70,
    'Sun Pharma',
    80.10,
    1300274,
    'Mid Cap',
    0
),(
    80,
    'TCS',
    6653.67,
    861002,
    'Large Cap',
    0
);

INSERT INTO mutualFunds VALUES(
    1024,
    'Axis Bank Prduential Fund'
),(
    2048,
    'High Growth Momentum Fund'
),(
    4096,
    'Bajaj Alliance growth Fund'
),(
    8192,
    'Kotak Savings Fund'
),(
    16384,
    'Tata Liquid Fund'
),(
    32768,
    'SBI Focused Equity Fund'
),(
    65536,
    'UTI Nifity Index Fund'
),(
    131072,
    'Aditya Birla Fund'
);

INSERT INTO bonds VALUES(
    300,
    'REC CAPITAL GAIN BOND',
    '5 Years',
    2000,
    10000,
    2,
    '5 years'
),(
    400,
    'STATE BANK OF INDIA PERPETUAL',
    '2 years',
    1400,
    1000000,
    6,
    '2 years'
),(
    500,
    'BAJAJ FINANCE LIMITED',
    '9 Years',
    5000,
    600000,
    5,
    '9 years'
),(
    600,
    'HINDUJA LEYLAND LIMITED',
    '2 Years',
    7600,
    1250000,
    9.2,
    '2 Years'
),(
    700,
    'INDIAN RAILWAY FINANCE LIMITED',
    '9 Years',
    8650,
    3900000,
    7.35,
    '9 Years'
),(
    800,
    'NATIONAL HIGHWAYS OF INDIA',
    '4 Years',
    2340,
    430000,
    3.86,
    '4 Years'
),(
    900,
    'NHPC LIMITED',
    '12 Years',
    14900,
    545000,
    8.92,
    '12 Years'
),(
    1000,
    'HDB FINANCIAL SERVICES LIMITED',
    '6 Years',
    7530,
    7890000,
    9.15,
    '6 Years'
);

INSERT INTO commodities VALUES(
    101,
    'GOLD',
    'Bullion',
    46283.00
),(
    102,
    'COTTON',
    'Agriculture',
    28230.00
),(
    103,
    'CRUDEOIL',
    'ENERGY',
    5793.00
),(
    104,
    'SILVER',
    'Bullion',
    66575.00
),(
    105,
    'COPPER',
    'Bullion',
    762.25
),(
    106,
    'LEAD',
    'Bullion',
    186.85
),(
    107,
    'ZINC',
    'Bullion',
    283.85
),(
    108,
    'RUBBER',
    'INDUSTRIAL',
    16700.00
);

INSERT INTO isCollectionsOf VALUES(
    1024,
    10
),(
    1024,
    30
),(
    1024,
    60
),(
    2048,
    10
),(
    2048,
    20
),(
    2048,
    40
),(
    4096,
    20
),(
    4096,
    30
),(
    4096,
    80
),(
    8192,
    50
),(
    8192,
    20
),(
    8192,
    30
),(
    16384,
    80
),(
    16384,
    70
),(
    16384,
    10
),(
    32768,
    30
),(
    32768,
    20
),(
    32768,
    70
),(
    65536,
    80
),(
    65536,
    10
),(
    65536,
    40
),(
    131072,
    20
),(
    131072,
    40
),(
    131072,
    60
);

INSERT INTO handlesStocks VALUES(
    55,
    10
),(
    55,
    20
),(
    55,
    30
),(
    55,
    40
),(
    55,
    50
),(
    55,
    60
),(
    55,
    70
),(
    55,
    80
),(
    66,
    10
),(
    66,
    20
),(
    66,
    30
),(
    66,
    40
),(
    66,
    50
),(
    66,
    60
),(
    66,
    70
),(
    66,
    80
),(
    77,
    10
),(
    77,
    20
),(
    77,
    30
),(
    77,
    40
),(
    77,
    50
),(
    77,
    60
),(
    77,
    70
),(
    77,
    80
),(
    88,
    10
),(
    88,
    20
),(
    88,
    30
),(
    88,
    40
),(
    88,
    50
),(
    88,
    60
),(
    88,
    70
),(
    88,
    80
),(
    99,
    10
),(
    99,
    20
),(
    99,
    30
),(
    99,
    40
),(
    99,
    50
),(
    99,
    60
),(
    99,
    70
),(
    99,
    80
),(
    111,
    10
),(
    111,
    20
),(
    111,
    30
),(
    111,
    40
),(
    111,
    50
),(
    111,
    60
),(
    111,
    70
),(
    111,
    80
),(
    222,
    10
),(
    222,
    20
),(
    222,
    30
),(
    222,
    40
),(
    222,
    50
),(
    222,
    60
),(
    222,
    70
),(
    222,
    80
),(
    333,
    10
),(
    333,
    20
),(
    333,
    30
),(
    333,
    40
),(
    333,
    50
),(
    333,
    60
),(
    333,
    70
),(
    333,
    80
);

INSERT INTO handlesMF VALUES(
    55,
    1024
),(
    55,
    2048
),(
    55,
    4096
),(
    55,
    8192
),(
    55,
    16384
),(
    55,
    32768
),(
    55,
    65536
),(
    55,
    131072
),(
    66,
    1024
),(
    66,
    2048
),(
    66,
    4096
),(
    66,
    8192
),(
    66,
    16384
),(
    66,
    32768
),(
    66,
    65536
),(
    66,
    131072
),(
    77,
    1024
),(
    77,
    2048
),(
    77,
    4096
),(
    77,
    8192
),(
    77,
    16384
),(
    77,
    32768
),(
    77,
    65536
),(
    77,
    131072
),(
    88,
    1024
),(
    88,
    2048
),(
    88,
    4096
),(
    88,
    8192
),(
    88,
    16384
),(
    88,
    32768
),(
    88,
    65536
),(
    88,
    131072
),(
    99,
    1024
),(
    99,
    2048
),(
    99,
    4096
),(
    99,
    8192
),(
    99,
    16384
),(
    99,
    32768
),(
    99,
    65536
),(
    99,
    131072
),(
    111,
    1024
),(
    111,
    2048
),(
    111,
    4096
),(
    111,
    8192
),(
    111,
    16384
),(
    111,
    32768
),(
    111,
    65536
),(
    111,
    131072
),(
    222,
    1024
),(
    222,
    2048
),(
    222,
    4096
),(
    222,
    8192
),(
    222,
    16384
),(
    222,
    32768
),(
    222,
    65536
),(
    222,
    131072
),(
    333,
    1024
),(
    333,
    2048
),(
    333,
    4096
),(
    333,
    8192
),(
    333,
    16384
),(
    333,
    32768
),(
    333,
    65536
),(
    333,
    131072
);

INSERT INTO handlesBonds VALUES(
    55,
    300
),(
    55,
    400
),(
    55,
    500
),(
    55,
    600
),(
    55,
    700
),(
    55,
    800
),(
    55,
    900
),(
    55,
    1000
),(
    66,
    300
),(
    77,
    400
),(
    77,
    500
),(
    77,
    600
),(
    77,
    700
),(
    77,
    800
),(
    77,
    900
),(
    77,
    1000
),(
    88,
    300
),(
    88,
    400
),(
    88,
    500
),(
    88,
    600
),(
    88,
    700
),(
    88,
    800
),(
    88,
    900
),(
    88,
    1000
),(
    99,
    300
),(
    99,
    400
),(
    99,
    500
),(
    99,
    600
),(
    99,
    700
),(
    99,
    800
),(
    99,
    900
),(
    99,
    1000
),(
    111,
    300
),(
    111,
    400
),(
    111,
    500
),(
    111,
    600
),(
    111,
    700
),(
    111,
    800
),(
    111,
    900
),(
    111,
    1000
),(
    222,
    300
),(
    222,
    400
),(
    222,
    500
),(
    222,
    600
),(
    222,
    700
),(
    222,
    800
),(
    222,
    900
),(
    222,
    1000
),(
    333,
    300
),(
    333,
    400
),(
    333,
    500
),(
    333,
    600
),(
    333,
    700
),(
    333,
    800
),(
    333,
    900
),(
    333,
    1000
);

INSERT INTO handlesCommodities VALUES(
    55,
    101
),(
    55,
    102
),(
    55,
    103
),(
    55,
    104
),(
    55,
    105
),(
    55,
    106
),(
    55,
    107
),(
    55,
    108
),(
    66,
    101
),(
    66,
    102
),(
    66,
    103
),(
    66,
    104
),(
    66,
    105
),(
    66,
    106
),(
    66,
    107
),(
    66,
    108
),(
    77,
    101
),(
    77,
    102
),(
    77,
    103
),(
    77,
    104
),(
    77,
    105
),(
    77,
    106
),(
    77,
    107
),(
    77,
    108
),(
    88,
    101
),(
    88,
    102
),(
    88,
    103
),(
    88,
    104
),(
    88,
    105
),(
    88,
    106
),(
    88,
    107
),(
    88,
    108
),(
    99,
    101
),(
    99,
    102
),(
    99,
    103
),(
    99,
    104
),(
    99,
    105
),(
    99,
    106
),(
    99,
    107
),(
    99,
    108
),(
    111,
    101
),(
    111,
    102
),(
    111,
    103
),(
    111,
    104
),(
    111,
    105
),(
    111,
    106
),(
    111,
    107
),(
    111,
    108
),(
    222,
    101
),(
    222,
    102
),(
    222,
    103
),(
    222,
    104
),(
    222,
    105
),(
    222,
    106
),(
    222,
    107
),(
    222,
    108
),(
    333,
    101
),(
    333,
    102
),(
    333,
    103
),(
    333,
    104
),(
    333,
    105
),(
    333,
    106
),(
    333,
    107
),(
    333,
    108
);

INSERT INTO phoneNumber VALUES(
    55,
    '+91 8627386451'
),(
    55,
    '080 26765180'
),(
    66,
    '+91 7722871925'
),(
    66,
    '080 46681627'
),(
    77,
    '+91 8819263371'
),(
    77,
    '080 61128638'
),(
    88,
    '+91 9982739201'
),(
    88,
    '080 22346718'
),(
    99,
    '+91 8262328721'
),(
    99,
    '080 736349211'
),(
    111,
    '+91 887392910371'
),(
    111,
    '080 278382911'
),(
    222,
    '+91 88273829122'
),(
    222,
    '080 22638627'
),(
    333,
    '+91 9872918211'
),(
    333,
    '080 44829716'
);

INSERT INTO users(username,password,isbroker) VALUES('abhi@gmail.com',crypt('1234',gen_salt('bf')),'f');
INSERT INTO investorsAndTraders VALUES(
    1,
    'Abhishek',
    '2001-04-25',
    '449775290764',
    '+91 9886542986',
    '560019',
    'Bengaluru',
    'Karnataka',
    100000.00,
    55
);
INSERT INTO holdsStocks Values(
    1,10,1000
),(
    1,20,800
),(
    1,30,900
),(
    1,40,400
),(
    1,50,600
),(
    1,60,1000
),(
    1,70,100
),(
    1,80,600
);

SELECT sell(1,10,3000,1000);
SELECT sell(1,20,1000,800);
SELECT sell(1,30,1750,900);
SELECT sell(1,40,2650,400);
SELECT sell(1,50,2500,600);
SELECT sell(1,60,3750,1000);
SELECT sell(1,70,85,100);
SELECT sell(1,80,6500,600);