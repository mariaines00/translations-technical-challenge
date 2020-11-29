#!/bin/bash

cd server
docker build -t lengoo . 
docker run -d -p 3000:3000 lengoo
