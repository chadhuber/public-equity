echo "Pushing changes to STAGING"
rm archive.zip 
echo "Zipping file"
zip -X -r -q archive.zip .
echo "Uploading to AWS Lambda"
aws lambda update-function-code --function-name public-equity-staging --zip-file fileb://archive.zip