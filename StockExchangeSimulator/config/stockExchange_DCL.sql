\c stockexchange
drop user admin;
drop user database_supervisor;
drop user investor;
drop user broker;

CREATE USER admin with password '1234' createdb;
grant USAGE,SELECT ON ALL SEQUENCES IN SCHEMA public to admin;
grant ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

CREATE USER database_supervisor with password '1234' createdb;
grant select,insert,update,delete on ALL TABLES IN SCHEMA public TO database_supervisor;

CREATE USER investor with password '1234' createdb;
grant select on ALL TABLES IN SCHEMA public TO investor;
grant insert,update,delete on investorsAndTraders,transactions,holdsCommodities,holdsBonds,holdsStocks,holdsMF,marketValue TO investor;
grant USAGE,SELECT ON SEQUENCE transactions_transaction_id_seq TO investor;

CREATE USER broker with password '1234' createdb;
grant select on ALL TABLES IN SCHEMA public TO broker;
grant insert,update,delete on brokers,phoneNumber,handlesBonds,handlesCommodities,handlesMF,handlesStocks TO broker;