/**
 * Created by zhassan on 2017-05-04.
 *
 * Data Persistence code to do for example the following:

 cqlsh> select * from product.orders;

 id                                   | created                              | customerid                           | productid                            | productquantity
 --------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+-----------------
 886f3310-30f1-11e7-91b3-6bc80341971c | 886f3311-30f1-11e7-91b3-6bc80341971c | 6e6172fe-30c8-11e7-ba5f-9801a798fc8f | 7916b318-30e0-11e7-ac7a-9801a798fc8f |               1

 (1 rows)
 cqlsh> select * from product.customers limit 2;

 id                                   | address                                | city      | firstname | lastname | postalcode | province
 --------------------------------------+----------------------------------------+-----------+-----------+----------+------------+----------
 6ea15180-30c8-11e7-8004-9801a798fc8f |       7 Scott Blvd Milton, ON, L9T 0R9 |    Milton |    NATHEN |   HOLDEN |     L9T0R9 |       ON
 6d5e10b0-30c8-11e7-b0e3-9801a798fc8f | 8-905 4th Ave N Saskatoon, SK, S7K 2N5 | Saskatoon |    DENVER |   DARYLE |     S7K2N5 |       SK

 (2 rows)
 cqlsh> select * from product.inventory limit 2;

 id                                   | pname  | pprice | ptype
 --------------------------------------+--------+--------+-------
 79161a98-30e0-11e7-b4e8-9801a798fc8f | celery |   0.99 | fruit
 7915f0cc-30e0-11e7-91c7-9801a798fc8f | carrot |   5.10 | fruit


 */
package com.model;