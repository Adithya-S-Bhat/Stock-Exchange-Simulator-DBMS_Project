--Simple Queries
--1.	Transactions made by an investor
Select dateOfTransaction,transaction_id,name_i,amount,modeOfTransaction
FROM  transactions NATURAL JOIN investorsAndTraders
ORDER BY dateOfTransaction;

--2.	Holds related queries on commodities, stocks, and bonds
Select name_i,companyName,currentValue
From holdsStocks hs,investorsAndTraders i,stocks s
Where hs.i_id=i.i_id AND hs.s_id=s.s_id;

--3.	Investors associated with a broker
Select name as brokerName,name_i
From investorsAndTraders i,brokers b
Where i.broker_id=b.broker_id;

--4.	Various entities handled by broker 'Groww'
Select companyName,currentValue
From brokers b, handlesStocks hs,stocks s
Where b.broker_id=hs.broker_id AND hs.s_id=s.s_id AND b.name='Groww';

--5.	Bank account info of an investor 'Abhishek'
Select name_i,bankName,accountNumber,ifsc,branch
From investorsAndTraders i,banks b
Where b.i_id=i.i_id AND i.name_i='Abhishek';

--Nested Queries
--1. Stocks which are part of a Mutual fund 'Bajaj Alliance growth Fund'
Select companyName,currentValue,totalQuantity
From stocks s
Where s_id in (
    select s_id
    from mutualFunds mf,isCollectionsOf ico
    where mf.m_id=ico.m_id and mf.name='Bajaj Alliance growth Fund'
);

EXPLAIN Select companyName,currentValue,totalQuantity
From stocks s
Where s_id in (
    select s_id
    from mutualFunds mf,isCollectionsOf ico
    where mf.m_id=ico.m_id and mf.name='Bajaj Alliance growth Fund'
);

--2.Vary the current value of all stocks in mutual fund id 1024
UPDATE stocks
SET currentValue=3000
where s_id in (
    select s_id 
    from isCollectionsOf ico NATURAL JOIN stocks s 
    where ico.m_id=1024 
);

EXPLAIN UPDATE stocks
SET currentValue=3000
where s_id in (
    select s_id 
    from isCollectionsOf ico NATURAL JOIN stocks s 
    where ico.m_id=1024 
);

--3.Display the updated margin available after the transactions.
SELECT name_i,marginAvailable + amount as updatedMargin
FROM investorsAndTraders NATURAL JOIN transactions
WHERE i_id in (Select i_id from transactions WHERE typeOfTransaction='Deposit');

EXPLAIN SELECT name_i,marginAvailable + amount as updatedMargin
FROM investorsAndTraders NATURAL JOIN transactions
WHERE i_id in (Select i_id from transactions WHERE typeOfTransaction='Deposit');

--4 set operations related query- intersection of current value>2000 and quantity>400000
SELECT companyName,totalQuantity,currentValue
FROM stocks
WHERE currentValue>'2000' INTERSECT (
    SELECT companyName,totalQuantity,currentValue
    FROM stocks
    WHERE totalQuantity>'400000'
);

EXPLAIN SELECT companyName,totalQuantity,currentValue
FROM stocks
WHERE currentValue>'2000' INTERSECT (
    SELECT companyName,totalQuantity,currentValue
    FROM stocks
    WHERE totalQuantity>'400000'
);

--5. display stocks not held by an investor 'Abhiram Puranik'
SELECT companyName,currentValue
FROM Stocks
WHERE s_id in (
    select s_id 
    from holdsStocks EXCEPT select s_id 
    from holdsStocks where i_id in (
    select i_id from investorsAndTraders where name_i = 'Abhiram Puranik')
);

EXPLAIN SELECT companyName,currentValue
FROM Stocks
WHERE s_id in (
    select s_id 
    from holdsStocks EXCEPT select s_id 
    from holdsStocks where i_id in (
    select i_id from investorsAndTraders where name_i = 'Abhiram Puranik')
);

--Complex Queries
--1. Query all holdings of an investor
SELECT i.i_id, c.name as CommodityName,s.companyName as StockName,bond.name as BondName
FROM investorsAndTraders i,holdsCommodities hc,commodities c,holdsStocks hs,stocks s,holdsBonds hb,bonds bond
WHERE i.name_i='Adithya' AND i.i_id=hc.i_id AND hc.c_id=c.c_id AND i.i_id=hs.i_id AND hs.s_id=s.s_id AND i.i_id=hb.i_id AND hb.b_id=bond.b_id;

--2. buy function
-- implemented in BuyDDL.sql file

--3. sell function
-- implemented in SellDDL.sql file

--4. Query all entities held by broker
SELECT b.broker_id, c.name as CommodityName,mf.name as MutualFundName,s.companyName as StockName,bond.name as BondName
FROM brokers b,handlesCommodities hc,commodities c,handlesMF hmf,mutualFunds mf,handlesStocks hs,stocks s,handlesBonds hb,bonds bond
WHERE b.name='Zerodha' AND b.broker_id=hc.broker_id AND hc.c_id=c.c_id AND b.broker_id=hmf.broker_id AND hmf.m_id=mf.m_id AND b.broker_id=hs.broker_id AND hs.s_id=s.s_id AND b.broker_id=hb.broker_id AND hb.b_id=bond.b_id;

--5. Inserting a new stock to the stocks list, 
--mutual funds, investor stock holdings
WITH Y as (
    INSERT INTO stocks
    VALUES (90,'PESU',100,50000,'Small Cap')
    returning s_id
), X as (
    INSERT INTO isCollectionsOf
    SELECT 1024,s_id
    FROM Y)
INSERT INTO holdsStocks
SELECT 1,s_id,10
FROM Y;

--transactions

--transaction 1
begin;
insert into transactions values(
    654,
    9430.00,
    '2021-01-09',
    'Debit Card',
    'Deposit',
    4
);
insert into transactions values(
    689,
    4320.08,
    '2021-02-21',
    'Bank Transfer',
    'Withdraw',
    8
);
insert into transactions values(
    703,
    13087.76,
    '2021-02-25',
    'UPI Transfer',
    'Deposit',
    8
);
select * from transactions;
savepoint s1;
insert into transactions values(
    708,
    98711.00,
    '2021-03-01',
    'XXXXX XXXXX',
    'Deposit',
    8
);
insert into transactions values(
    709,
    16723.00,
    '2021-03-01',
    'XXXXX XXXXX',
    'Deposit',
    8
);
rollback to savepoint s1;
END;
select * from transactions;

-- transaction 2
begin;
insert into phoneNumber values(
    66,
    '+91 8762378178'
);
insert into phoneNumber values(
    222,
    '+91 8972837634'
);
savepoint s1;
insert into phoneNumber values(
    66,
    '+91 8762378178'
);
rollback to savepoint s1;
insert into phoneNumber values(
    111,
    '+91 8423452578'
);
insert into phoneNumber values(
    88,
    '+91 8726387645'
);
savepoint s2;
insert into phoneNumber values(
    111,
    '+91 8423452578'
);
insert into phoneNumber values(
    88,
    '+91 8726387645'
);
rollback to savepoint s2;
end;
select * from phoneNumber;