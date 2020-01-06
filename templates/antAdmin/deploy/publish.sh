#!/bin/bash -l
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TARGET=${1:-daily}
echo "target is ${TARGET}"
. ./publish-${TARGET}.properties

VERSION=$(date +%Y%m%d%H%M%S);
URL=$URL_PREFIX/$VERSION;

# Step1: 部署
cd $DIR/../
rm -rf build

cnpm install

cross-env BUILD_ENV=$TARGET PUBLIC_URL=$URL npm run build

# Step2: 上传部署包到OSS

OSS_NAME="oss://$OSS_BUCKET/${VERSION}"

echo "start upload to ${OSS_NAME}"

aliyun oss cp --region $REGION -r ${OSS_NAME} build

echo "upload to ${OSS_NAME} finished!"

DIST_NAME="oss://$OSS_BUCKET"

echo "start upload to ${DIST_NAME}"

aliyun oss cp --region $REGION -r -f ${DIST_NAME} build/index.html

echo "upload to ${DIST_NAME}/index.html finished!"

REFRESH_PATH=`echo "$URL_PREFIX/" | sed "s/.*\/\///"`

REFRESH_TASK_ID=`aliyun cdn RefreshObjectCaches --ObjectPath "${REFRESH_PATH}" --ObjectType 'Directory' | jq '.RefreshTaskId' | sed 's:\"::g'`;

echo "refresh $REFRESH_TASK_ID end, deploy success!"
