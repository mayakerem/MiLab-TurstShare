/*
CREATE DATABASE DriversDb;
USE DriversDb;
*/
DROP TABLE IF EXISTS Drivers
DROP PROCEDURE IF EXISTS createDrivers
DROP PROCEDURE IF EXISTS updateDrivers
GO

CREATE TABLE Drivers (
	id int IDENTITY PRIMARY KEY,
	title nvarchar(30) NOT NULL,
	description nvarchar(4000),
	completed bit,
	dueDate datetime2 default (dateadd(day, 3, getdate()))
)
GO

INSERT INTO Drivers (title, description, completed, dueDate)
VALUES
('Install SQL Server 2016','Install RTM version of SQL Server 2016', 0, '2017-03-08'),
('Get new samples','Go to github and download new samples', 0, '2016-03-09'),
('Try new samples','Install new Management Studio to try samples', 0, '2016-03-12')

GO

create procedure dbo.createDrivers(@Drivers nvarchar(max))
as begin
	insert into Drivers
	select *
	from OPENJSON(@Drivers) 
			WITH (	title nvarchar(30), description nvarchar(4000),
					completed bit, dueDate datetime2)
end
GO

create procedure updateDrivers(@id int, @Drivers nvarchar(max))
as begin
	update Drivers
    set title = json.title, description = json.description,
        completed = json.completed, dueDate = json.dueDate
    from OPENJSON( @Drivers )
			WITH(   title nvarchar(30), description nvarchar(4000),
					completed bit, dueDate datetime2) AS json
    where id = @id
end
go

select * from drivers_db for json path