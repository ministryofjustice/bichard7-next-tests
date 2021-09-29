import os
import psycopg2
import ssl
from urllib.request import urlopen

FAIL = '\033[91m'
ENDC = '\033[0m'

def smoke_test():
    db_host = os.getenv('DB_HOST', "localhost")
    port = os.getenv('DB_PORT', "5432")
    user = os.getenv('DB_USER', "bichard")
    password = os.getenv('DB_PASSWORD', "password")

    try:
        conn = psycopg2.connect(
            host=db_host,
            port=port,
            database="bichard",
            user=user,
            password=password
        )
        cur = conn.cursor()
        cur.execute('SELECT 1')
    except psycopg2.OperationalError as e:
        print(FAIL + " -- Failed to connect to Postgress" + ENDC)
        print(e)
        return False
    print(" ++ Connected to postgress")

    try:
        usersHost = os.getenv('USERS_HOST', "localhost");
        usersPort = os.getenv('USERS_PORT', "3443");

        #html = urlopen('http://localhost:3000/users/login') # for local testing
        ssl._create_default_https_context = ssl._create_unverified_context
        html = urlopen(f'https://{usersHost}:{usersPort}/')
        res = str(html.read())
        assert("Sign in to Bichard 7" in res)
    except Exception as e:
        print(FAIL + " -- Failed to open user service" + ENDC)
        print(e)
        return False
    print(" ++ Connected to user service")

    return True
    
if "__main__" == __name__:
    smoke_test()