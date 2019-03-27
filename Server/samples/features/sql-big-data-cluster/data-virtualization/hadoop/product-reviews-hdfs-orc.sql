USE sales
GO

-- Create file format for orc file with appropriate properties.
--
IF NOT EXISTS(SELECT * FROM sys.external_file_formats WHERE name = 'orc_file')
    CREATE EXTERNAL FILE FORMAT orc_file
    WITH (
        FORMAT_TYPE = ORC,
        DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec'
    );


-- Create external table over HDFS data source using HADOOP type in
-- SQL Server 2019 big data cluster. The HADOOP data source is existing
-- PolyBase v1 syntax available by specifying location to HDFS namenode in
-- SQL Server big data cluster.
--
IF NOT EXISTS(SELECT * FROM sys.external_tables WHERE name = 'product_reviews_hdfs_orc')
    CREATE EXTERNAL TABLE [product_reviews_hdfs_orc]
    ("pr_review_sk" BIGINT , "pr_review_content" varchar(8000))
    WITH
    (
        DATA_SOURCE = HadoopData,
        LOCATION = '/user/hive/warehouse/product_reviews_orc',
        FILE_FORMAT = orc_file
    );
GO

-- Join external table with local tables
-- 
SELECT 
    p.pr_review_sk, pc.pr_review_content
  FROM product_reviews as p
  JOIN (SELECT TOP(10) * FROM product_reviews_hdfs_orc) AS pc
    ON pc.pr_review_sk = p.pr_review_sk;
GO

-- Cleanup
/*
DROP EXTERNAL TABLE [dbo].[product_reviews_hdfs_orc];
GO
*/
