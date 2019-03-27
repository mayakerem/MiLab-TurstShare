# SQL Server big data clusters

Installation instructions for SQL Server 2019 big data clusters can be found [here](https://docs.microsoft.com/en-us/sql/big-data-cluster/deployment-guidance?view=sql-server-ver15).

## Samples Setup

**Before you begin**, load the sample data into your big data cluster. For instructions, see [Load sample data into a SQL Server 2019 big data cluster](https://docs.microsoft.com/en-us/sql/big-data-cluster/tutorial-load-sample-data).

## Executing the sample scripts
The scripts should be executed in a specific order to test the various features. Execute the scripts from each folder in below order:

1. __[spark](spark/)__
1. __[data-virtualization/storage-pool](data-virtualization/storage-pool)__
1. __[data-virtualization/oracle](data-virtualization/oracle)__
1. __[data-pool](data-pool/)__
1. __[machine-learning/r](machine-learning/r)__
1. __[machine-learning/python](machine-learning/python)__

## __[data-pool](data-pool/)__

SQL Server 2019 big data cluster contains a data pool which consists of many SQL Server instances to store data & query in a scale-out manner.

### Data ingestion using Spark
The sample script [data-pool/data-ingestion-spark.sql](data-pool/data-ingestion-spark.sql) shows how to perform data ingestion from Spark into data pool table(s).

### Data ingestion using sql
The sample script [data-pool/data-ingestion-sql.sql](data-pool/data-ingestion-sql.sql) shows how to perform data ingestion from T-SQL into data pool table(s).

## __[data-virtualization](data-virtualization/)__

SQL Server 2019 or SQL Server 2019 big data cluster can use PolyBase external tables to connect to other data sources.

### External table over Storage Pool
SQL Server 2019 big data cluster contains a storage pool consisting of HDFS, Spark and SQL Server instances. The [data-virtualization/storage-pool](data-virtualization/storage-pool) folder contains samples that demonstrate how to query data in HDFS inside SQL Server 2019 big data cluster.

### External table over Oracle
SQL Server 2019 uses new ODBC connectors to enable connectivity to SQL Server, Oracle, Teradata, MongoDB and generic ODBC data sources.

The [data-virtualization/oracle](data-virtualization/oracle) folder contains samples that demonstrate how to query data in Oracle using external tables.

## __[deployment](deployment/)__

The [deployment](deployment) folder contains the scripts for deploying a Kubernetes cluster for SQL Server 2019 big data cluster.

## __[machine-learning](machine-learning/)__

SQL Server 2016 added support executing R scripts from T-SQL. SQL Server 2017 added support for executing Python scripts from T-SQL. SQL Server 2019 adds support for executing Java code from T-SQL. SQL Server 2019 big data cluster adds support for executing Spark code inside the big data cluster.

### SQL Server Machine Learning Services
The [machine-learning\sql](machine-learning\sql) folder contains the sample SQL scripts that show how to invoke R, Python, and Java code from T-SQL.

### Spark Machine Learning
The [machine-learning\spark](machine-learning\spark) folder contains the Spark samples.
