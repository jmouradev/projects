import mysql.connector

config = {
  'user': 'root2',
  'password': 'teste',
  'unix_socket': '/Applications/MAMP/tmp/mysql/mysql.sock',
  'database': 'tp1_db',
  'raise_on_warnings': True,
}

mydb = mysql.connector.connect(**config)

mycursor = mydb.cursor()

query = "SELECT * FROM Cliente ORDER BY nome DESC"
# query = "SELECT * FROM Cliente WHERE morada = %s"
# adr = ("Rua do Japonês 10 Sintra", )

mycursor.execute(query)

myresult = mycursor.fetchall()

for i in myresult:
    print(i)

