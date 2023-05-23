FROM tiangolo/uwsgi-nginx-flask:python3.8

RUN pip3 install pyjwt[crypto]

COPY ./challenge/server.py /app/server.py
COPY ./challenge/priv /app/priv
COPY ./challenge/pub /app/pub
COPY ./challenge/flag.txt /app/flag.txt

EXPOSE 80

CMD ["python", "server.py"]