DROP DATABASE stockexchange;
CREATE DATABASE stockexchange;

\c stockexchange

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
    transaction_id INT,
    amount DECIMAL(10,2),
    DATEOfTransaction DATE,
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


alter table investorsAndTraders add constraint iat_fk_brokerid foreign key(broker_id) references brokers(broker_id);

alter table banks add constraint banks_fk_iid foreign key(i_id) references investorsAndTraders(i_id);

alter table transactions add constraint transactions_fk_iid foreign key(i_id) references investorsAndTraders(i_id);

alter table holdsCommodities add constraint holdsCommodities_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsCommodities add constraint holdsCommodities_fk_cid foreign key(c_id) references commodities(c_id);

alter table holdsStocks add constraint holdsStocks_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsStocks add constraint holdsStocks_fk_sid foreign key(s_id) references stocks(s_id);

alter table holdsMF add constraint holdsMF_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsMF add constraint holdsMF_fk_mid foreign key(m_id) references mutualFunds(m_id);

alter table holdsBonds add constraint holdsBonds_fk_iid foreign key(i_id) references investorsAndTraders(i_id);
alter table holdsBonds add constraint holdsBonds_fk_bid foreign key(b_id) references bonds(b_id);

alter table isCollectionsOf add constraint ico_fk_mid foreign key(m_id) references mutualFunds(m_id);
alter table isCollectionsOf add constraint ico_fk_sid foreign key(s_id) references stocks(s_id);

alter table handlesStocks add constraint hs_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesStocks add constraint hs_fk_sid foreign key(s_id) references stocks(s_id);

alter table handlesMF add constraint hmf_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesMF add constraint hmf_fk_mid foreign key(m_id) references mutualFunds(m_id);

alter table handlesBonds add constraint hb_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesBonds add constraint hb_fk_bid foreign key(b_id) references bonds(b_id);

alter table handlesCommodities add constraint hc_fk_brokerid foreign key(broker_id) references brokers(broker_id);
alter table handlesCommodities add constraint hc_fk_cid foreign key(c_id) references commodities(c_id);

alter table phoneNumber add constraint pn_fk_brokerid foreign key(broker_id) references brokers(broker_id);

