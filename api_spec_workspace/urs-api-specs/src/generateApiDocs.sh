#!/usr/bin/env bash

# TODO
# openapi-generator generate -i ./urs-api-spec.yaml -g html2 -o api-docs

openapi-generator generate -i  ./api/openapi.yaml -g html2 -o api-docs

