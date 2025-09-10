#!/usr/bin/env bash

openapi-generator generate -i ./urs-api-spec.yaml -g html2 -o api-docs
