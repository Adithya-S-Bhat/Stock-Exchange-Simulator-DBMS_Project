DROP DATABASE stockexchange;
CREATE DATABASE stockexchange;

\c stockexchange

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar UNIQUE,
    password varchar,
    isBroker BOOLEAN
);
CREATE EXTENSION pgcrypto;

set timezone to 'Asia/Kolkata';
CREATE TABLE marketvalue(
    id SERIAL PRIMARY KEY,
    t TIME DEFAULT CURRENT_TIME,
    dt DATE DEFAULT CURRENT_DATE,
    totalValue DECIMAL(10,2)
);

CREATE TABLE investorsAndTraders(
    i_id INT,
    name_i VARCHAR(30),
    dob DATE,
    aadharNumber VARCHAR(20),
    phoneNumber VARCHAR(30),
    pinCode VARCHAR(20),
    city VARCHAR(20),
    state_i VARCHAR(20),
    marginAvailable DECIMAL(10,2),
    broker_id int,
    primary key(i_id)
);

CREATE TABLE banks(
    i_id INT,
    bankName VARCHAR(30),
    accountNumber VARCHAR(30),
    ifsc VARCHAR(20),
    branch VARCHAR(20)
);

CREATE TABLE transactions(
    transaction_id SERIAL,
    amount DECIMAL(10,2),
    DATEOfTransaction VARCHAR,
    modeOfTransaction VARCHAR(30),
    typeOfTransaction VARCHAR(30),
    i_id INT,
    primary key(transaction_id)
);

CREATE TABLE holdsCommodities(
    i_id INT,
    c_id INT,
    quantity INT,
    PRIMARY KEY(i_id,c_id)
);


CREATE TABLE holdsStocks(
    i_id INT,
    s_id INT,
    quantity INT,
    PRIMARY KEY(i_id,s_id)
);


CREATE TABLE holdsMF(
    i_id INT,
    m_id INT,
    quantity INT,
    PRIMARY KEY(i_id,m_id)
);
--

CREATE TABLE holdsBonds(
    i_id INT,
    b_id INT,
    quantity INT,
    PRIMARY KEY(i_id,b_id)
);

CREATE TABLE stocks(
    s_id INT,
    companyName VARCHAR(50),
    currentValue DECIMAL(10,2),
    totalQuantity VARCHAR(30),
    typeOfStock VARCHAR(10), 
    difference DECIMAL(10,2),
    primary key(s_id)
);

CREATE TABLE isCollectionsOf(
    m_id INT,
    s_id INT,
    primary key(m_id,s_id)
);

CREATE TABLE mutualFunds(
    m_id INT,
    name VARCHAR(50),
    PRIMARY KEY(m_id)
);

CREATE TABLE bonds(
    b_id INT,
    name VARCHAR(50),
    ytm VARCHAR(50),
    pricePerUnit DECIMAL(10,2),
    faceValue DECIMAL(10,2),
    frequency INT,
    tenure VARCHAR(50),
    primary key(b_id)
);

CREATE table commodities(
    c_id INT,
    name VARCHAR(50),
    typeOfCommodity VARCHAR(50),
    price DECIMAL(10,2),
    primary key(c_id)
);

CREATE TABLE handlesStocks(
    broker_id INT,
    s_id INT,
    PRIMARY KEY(broker_id,s_id)
);

CREATE TABLE handlesMF(
    broker_id INT,
    m_id INT,
    PRIMARY KEY(broker_id,m_id)
);

CREATE TABLE handlesBonds(
    broker_id INT,
    b_id INT,
    PRIMARY KEY(broker_id,b_id)
);

CREATE TABLE handlesCommodities(
    broker_id INT,
    c_id INT,
    PRIMARY KEY(broker_id,c_id)
);

CREATE TABLE brokers(
    broker_id INT,
    name VARCHAR(20),
    website VARCHAR(30),
    address VARCHAR(50),
    brokerageRate DECIMAL(3,2),
    primary key(broker_id)
);

CREATE TABLE phoneNumber(
    broker_id INT,
    p_no VARCHAR(20),
    primary key(broker_id,p_no)
);


CREATE TABLE buy_table(
    buyer_id int, 
    stock_id int, 
    buy_price DECIMAL(10,2), 
    buy_quantity int

);

CREATE TABLE sell_table(
    seller_id int, 
    stock_id int, 
    sell_price DECIMAL(10,2), 
    sell_quantity int

);


alter table investorsAndTraders add constraint iat_fk_brokerid foreign key(broker_id) references brokers(broker_id);

alter table banks add constraint banks_fk_iid foreign key(i_id) references investorsAndTraders(i_id);

alter table transactions add constraint transactions_fk_iid foreign key(i_id) references investorsAndTraders(i_id);

alter table holdsCommodities add constraint holdsCommodities_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsCommodities add constraint holdsCommodities_fk_cid foreign key(c_id) references commodities(c_id);

alter table holdsStocks add constraint holdsStocks_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsStocks add constraint holdsStocks_fk_sid foreign key(s_id) references stocks(s_id) ON DELETE CASCADE;

alter table holdsMF add constraint holdsMF_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsMF add constraint holdsMF_fk_mid foreign key(m_id) references mutualFunds(m_id);

alter table holdsBonds add constraint holdsBonds_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsBonds add constraint holdsBonds_fk_bid foreign key(b_id) references bonds(b_id);

alter table isCollectionsOf add constraint ico_fk_mid foreign key(m_id) references mutualFunds(m_id);
alter table isCollectionsOf add constraint ico_fk_sid foreign key(s_id) references stocks(s_id) ON DELETE CASCADE;

alter table handlesStocks add constraint hs_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesStocks add constraint hs_fk_sid foreign key(s_id) references stocks(s_id) ON DELETE CASCADE;

alter table handlesMF add constraint hmf_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesMF add constraint hmf_fk_mid foreign key(m_id) references mutualFunds(m_id);

alter table handlesBonds add constraint hb_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesBonds add constraint hb_fk_bid foreign key(b_id) references bonds(b_id);

alter table handlesCommodities add constraint hc_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesCommodities add constraint hc_fk_cid foreign key(c_id) references commodities(c_id);

alter table phoneNumber add constraint pn_fk_brokerid foreign key(broker_id) references brokers(broker_id);

create function updateStockValue(stockid int, stockPrice DECIMAL(10,2))
returns void
language plpgsql
as
$$
declare
   return_value int;
begin
    UPDATE stocks SET currentValue = stockPrice where s_id = stockid;
end;
$$;


create function updateBuyerHoldings(buyerid int, stockid int, stockquantity int, StockPrice DECIMAL(10,2))
returns void
language plpgsql
as
$$
declare
   return_value int;
   stockheld char(100);
begin
   return_value := 0;
    SELECT exists into stockheld(SELECT * FROM holdsStocks WHERE s_id=stockid and i_id = buyerid);
    if(stockheld = 'true') THEN
        UPDATE holdsStocks SET quantity = quantity + stockquantity WHERE s_id = stockid and i_id = buyerid;
        return_value := 1;
    ELSE
        INSERT INTO holdsStocks values(buyerid, stockid, stockquantity);
        return_value := 1;
    END IF;
    UPDATE investorsAndTraders SET marginAvailable = marginAvailable - StockPrice * stockquantity where i_id = buyerid;
end;
$$;

create function updateBuyerHoldingsInQueue(buyerid int, stockid int, stockquantity int, StockPrice DECIMAL(10,2))
returns void
language plpgsql
as
$$
declare
   return_value int;
   stockheld char(100);
begin
   return_value := 0;
    SELECT exists into stockheld(SELECT * FROM holdsStocks WHERE s_id=stockid and i_id = buyerid);
    if(stockheld = 'true') THEN
        UPDATE holdsStocks SET quantity = quantity + stockquantity WHERE s_id = stockid and i_id = buyerid;
        return_value := 1;
    ELSE
        INSERT INTO holdsStocks values(buyerid, stockid, stockquantity);
        return_value := 1;
    END IF;
end;
$$;

create function updateSellerHoldings(Sellerid int, stockid int, stockquantity int, StockPrice DECIMAL(10,2))
returns void
language plpgsql
as
$$
declare
   numberofstocksheld int;
begin

    SELECT quantity into numberofstocksheld FROM holdsStocks WHERE s_id=stockid and i_id = sellerid;
    if(stockquantity = numberofstocksheld) THEN
        DELETE from holdsStocks where s_id = stockid and i_id = sellerid;        
    ELSE
        UPDATE holdsStocks SET quantity = quantity - stockquantity WHERE s_id = stockid and i_id = sellerid;
    END IF;
    --update margin
    UPDATE investorsAndTraders SET marginAvailable = marginAvailable + StockPrice * stockquantity where i_id = Sellerid;
end;
$$;



CREATE FUNCTION buy (
	buyerid int, stockid int,  buyprice DECIMAL(10,2), buyquantity int
)
RETURNS INT 
language plpgsql
AS
$$
DECLARE return_value int;
    stock_value DECIMAL(10,2);
    seller_present char(10);
    sellquantitycompute int;
    buyer_margin DECIMAL(10,2);
    stockheld char(10);
    sellerid int;
    quantityHeld int;
BEGIN 

    SELECT currentValue into stock_value FROM stocks WHERE s_id = stockid;
    SELECT marginAvailable into buyer_margin FROM investorsAndTraders WHERE i_id = buyerid;
    SELECT quantity into quantityHeld FROM holdsStocks WHERE i_id = buyerid and s_id = stockid;

    IF((stock_value*buyquantity) < buyer_margin)  THEN
        
        Select exists into seller_present(SELECT seller_id, stock_id, sell_price, sell_quantity from sell_table WHERE stock_id=stockid);
        SELECT sell_quantity into sellquantitycompute from sell_table WHERE stock_id=stockid and sell_price=buyprice;
        SELECT seller_id into sellerid from sell_table WHERE stock_id=stockid and sell_price=buyprice;
        SELECT sell_quantity into sellquantitycompute from sell_table WHERE stock_id=stockid and sell_price=buyprice;
        
        if(seller_present = 'true' and sellerid != buyerid) THEN                        
            
            if(sellquantitycompute = buyquantity ) THEN
                DELETE FROM sell_table where stock_id=stockid and sell_price=buyprice;
           
                PERFORM updateSellerHoldings(sellerid, stockid, sellquantitycompute, buyprice);
                PERFORM updateBuyerHoldings(buyerid, stockid, buyquantity, buyprice);
            
            ELSIF ( sellquantitycompute > buyquantity ) THEN
                UPDATE sell_table SET sell_quantity = sell_quantity - buyquantity where stock_id = stockid and seller_id= sellerid;                

                PERFORM updateSellerHoldings(sellerid, stockid, buyquantity, buyprice);
                PERFORM updateBuyerHoldings(buyerid, stockid, buyquantity, buyprice);
            
            ELSE -- sellquantitycompute < buyquantity
                DELETE FROM sell_table where stock_id=stockid and sell_price=buyprice and seller_id=sellerid;
                INSERT INTO buy_table(buyer_id, stock_id, buy_price, buy_quantity) values (buyerid, stockid, buyprice, buyquantity-sellquantitycompute);

                PERFORM updateSellerHoldings(sellerid, stockid, sellquantitycompute, buyprice);
                PERFORM updateBuyerHoldings(buyerid, stockid, sellquantitycompute, buyprice);
            END IF;

            PERFORM updateStockValue(stockid, buyprice);
            return_value := 1;
        
        ELSE
            INSERT INTO buy_table(buyer_id, stock_id, buy_price, buy_quantity) values (buyerid, stockid, buyprice, buyquantity); 
            --update margin
            UPDATE investorsAndTraders SET marginAvailable = marginAvailable - buyprice * buyquantity where i_id = buyerid;    
            return_value := 2;
        END IF;    

     --0=not enough margin
     --1=valid
     --2=waiting list       
    ELSE  
        raise notice 'Not enough Margin';
        return_value := 0;
    END IF;

    RETURN return_value;
END;
$$;


create function sell(
    sellerid int, stockid int,  sellprice DECIMAL(10,2), sellquantity int
)
returns int
language plpgsql
as
$$
declare
    return_value int;
    stock_value DECIMAL(10,2);
    buyer_present char(10);
    buyquantitycompute int;
    stockheld char(10);
    buyerid int;
    numberofstocksheld int;
begin
   
    SELECT exists into stockheld (SELECT * from holdsstocks where s_id = stockid and i_id = sellerid);
    SELECT quantity into numberofstocksheld from holdsStocks where s_id = stockid and i_id = sellerid;
    raise notice 'Value: %', stockheld;



    if(stockheld = 'true' and sellquantity <= numberofstocksheld) THEN
        
        SELECT exists into buyer_present(SELECT * from buy_table where stock_id = stockid and buy_price = sellprice);
        SELECT buy_quantity into buyquantitycompute from buy_table where stock_id = stockid and buy_price = sellprice;
        SELECT buyer_id into buyerid from buy_table where stock_id = stockid and buy_price = sellprice;

        if(buyer_present = 'true' and sellerid != buyerid) THEN

            if(buyquantitycompute = sellquantity ) THEN
                DELETE from buy_table where stock_id = stockid and buyer_id = buyerid;
                -- handle waiting things too
                PERFORM updateBuyerHoldingsInQueue(buyerid, stockid, buyquantitycompute, sellprice);                
                PERFORM updateSellerHoldings(sellerid, stockid, buyquantitycompute, sellprice);                

            ELSIF (buyquantitycompute > sellquantity ) THEN
                UPDATE buy_table set buy_quantity = buy_quantity - sellquantity where stock_id = stockid and buy_price = sellprice;
                PERFORM updateBuyerHoldingsInQueue(buyerid, stockid, sellquantity, sellprice);
                PERFORM updateSellerHoldings(sellerid, stockid, sellquantity, sellprice); 
                

            ELSE --buyquantitycompute < sellquantity
                DELETE from buy_table where stock_id = stockid and buyer_id = buyerid;
                PERFORM updateBuyerHoldingsInQueue(buyerid, stockid, buyquantitycompute, sellprice);
                PERFORM updateSellerHoldings(sellerid, stockid, buyquantitycompute, sellprice); 

                INSERT into sell_table values (sellerid, stockid, sellprice, sellquantity - buyquantitycompute );               
            END IF;
            
            PERFORM updateStockValue(stockid, sellprice);
            return_value := 1;

        ELSE -- no buyers
            INSERT into sell_table values (sellerid, stockid, sellprice, sellquantity );            
            return_value := 2;
        END IF;
    
    ELSE
        raise notice 'You dont have that stock or trying to sell more than what you own';
        return_value := 0;

    END IF;

   
   return return_value;
end;
$$;




