create function updateSellerHoldings(Sellerid int, stockid int, stockquantity int)
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
BEGIN 

    SELECT currentValue into stock_value FROM stocks WHERE s_id = stockid;
    SELECT marginAvailable into buyer_margin FROM investorsAndTraders WHERE i_id = buyerid;

    IF((stock_value*buyquantity) < buyer_margin)  THEN
        
        Select exists into seller_present(SELECT seller_id, stock_id, sell_price, sell_quantity from sell_table WHERE stock_id=stockid);
        SELECT sell_quantity into sellquantitycompute from sell_table WHERE stock_id=stockid and sell_price=buyprice;
        SELECT seller_id into sellerid from sell_table WHERE stock_id=stockid and sell_price=buyprice;
        
        if(seller_present = 'true' and sellerid != buyerid) THEN
            
            SELECT sell_quantity into sellquantitycompute from sell_table WHERE stock_id=stockid and sell_price=buyprice;
            
            if(sellquantitycompute-buyquantity = 0) THEN
                DELETE FROM sell_table where stock_id=stockid and sell_price=buyprice;
                SELECT exists into stockheld(SELECT * FROM holdsStocks WHERE s_id=stockid and i_id = buyerid);

                --handle deletion of quantity in seller
                DELETE FROM holdsStocks where s_id = stockid and i_id = sellerid;
                

                PERFORM updateSellerHoldings(sellerid, stockid, sellquantitycompute);

                if(stockheld = 'true') THEN
                    UPDATE holdsStocks SET quantity = quantity + buyquantity WHERE s_id = stockid and i_id = buyerid;
                ELSE
                    INSERT INTO holdsStocks values(buyerid, stockid, buyquantity);
                END IF;
            
            ELSIF ( sellquantitycompute > buyquantity ) THEN

                raise notice 'Value: %', sellerid;

                UPDATE sell_table SET sell_quantity = sell_quantity - buyquantity where stock_id = stockid and seller_id= sellerid;
                
                SELECT exists into stockheld(SELECT * FROM holdsStocks WHERE s_id=stockid and i_id = buyerid);
                raise notice 'buy quantity: %', buyquantity;
                PERFORM updateSellerHoldings(sellerid, stockid, buyquantity);

                -- for the buyer
                if(stockheld = 'true') THEN
                    UPDATE holdsStocks SET quantity = quantity + buyquantity WHERE s_id = stockid and i_id = buyerid;
                ELSE                    
                    INSERT INTO holdsStocks values(buyerid, stockid, buyquantity);
                END IF;
                
            
            ELSE -- sellquantitycompute < buyquantity
                PERFORM updateSellerHoldings(sellerid, stockid, sellquantitycompute);
                DELETE FROM sell_table where stock_id=stockid and sell_price=buyprice and seller_id=sellerid;
                INSERT INTO buy_table(buyer_id, stock_id, buy_price, buy_quantity) values (buyerid, stockid, buyprice, buyquantity-sellquantitycompute);
                
                SELECT exists into stockheld(SELECT * FROM holdsStocks WHERE s_id=stockid and i_id = buyerid);

                if(stockheld = 'true') THEN
                    UPDATE holdsStocks SET quantity = quantity + sellquantitycompute WHERE s_id = stockid and i_id = buyerid;
                ELSE
                    INSERT INTO holdsStocks values(buyerid, stockid, sellquantitycompute);
                END IF;
            END IF;          
        
        return_value := 1;
        
        ELSE
            INSERT INTO buy_table(buyer_id, stock_id, buy_price, buy_quantity) values (buyerid, stockid, buyprice, buyquantity);     
            return_value := 2;
        END IF;    

            
    ELSE  
        raise notice 'Not enough Margin';
        return_value := 0;
    END IF;

    RETURN return_value;
END;
$$;