create function updateBuyerHoldings(buyerid int, stockid int, stockquantity int)
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
   
--    return return_value;
end;
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

        if(buyer_present = 'true') THEN


            if(buyquantitycompute = sellquantity ) THEN
                DELETE from buy_table where stock_id = stockid and buyer_id = buyerid;

                -- handle waiting things too
                PERFORM updateBuyerHoldings(buyerid, stockid, buyquantitycompute);


                -- DELETE FROM buy_table where s_id = stockid and buy_price = sellprice;
                
                if(numberofstocksheld = sellquantity) THEN
                    DELETE FROM holdsStocks where s_id = stockid and i_id = sellerid;
                    

                ELSIF (numberofstocksheld > sellquantity) THEN
                    UPDATE holdsStocks SET quantity = quantity - sellquantity where s_id = stockid and i_id = sellerid;
                    
                ELSE
                    raise notice 'You cannot sell more than what you own';
                    
                END IF;
                

            ELSIF (buyquantitycompute > sellquantity ) THEN
                UPDATE buy_table set buy_quantity = buy_quantity - sellquantity where stock_id = stockid and buy_price = sellprice;
                PERFORM updateBuyerHoldings(buyerid, stockid, sellquantity); -- as buyquantity is more
                
                if(numberofstocksheld = sellquantity) THEN
                    DELETE FROM holdsStocks where s_id = stockid and i_id = sellerid;
                    

                ELSIF (numberofstocksheld > sellquantity) THEN
                    UPDATE holdsStocks SET quantity = quantity - sellquantity where s_id = stockid and i_id = sellerid;
                    
                ELSE
                    raise notice 'You cannot sell more than what you own';
                    
                END IF;


            ELSE
                DELETE from buy_table where stock_id = stockid and buyer_id = buyerid;
                PERFORM updateBuyerHoldings(buyerid, stockid, buyquantitycompute);

                if(numberofstocksheld = sellquantity) THEN
                    DELETE FROM holdsStocks where s_id = stockid and i_id = sellerid;
                    

                ELSIF (numberofstocksheld > sellquantity) THEN
                    UPDATE holdsStocks SET quantity = quantity - buyquantitycompute where s_id = stockid and i_id = sellerid;
                    
                ELSE
                    raise notice 'You cannot sell more than what you own';
                    
                END IF;

                INSERT into sell_table values (sellerid, stockid, sellprice, sellquantity - buyquantitycompute );
                


            END IF;
            
            return_value := 1;




        ELSE -- no buyers
            INSERT into sell_table values (sellerid, stockid, sellprice, sellquantity );
            return_value := 2;
        END IF;
    
    ELSE
        raise notice 'You dont have that stock';
        return_value := 0;

    END IF;

   
   return return_value;
end;
$$;

