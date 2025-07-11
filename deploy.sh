#!/bin/bash

# ===== CONFIGURE THESE =====
REMOTE_USER="oxygenarabia"
REMOTE_HOST="oxygenarabia.com"
REMOTE_PORT=22
REMOTE_PATH="public_html"
ZIP_NAME="oxygenarabia-cms.zip"
FOLDER_NAME="oxygenarabia-cms"
PLINK_PATH="/c/Program Files/PuTTY/plink.exe"
PSCP_PATH="/c/Program Files/PuTTY/pscp.exe"
PASSWORD="MSActs@1981"
BUILD_CMD="npm run build"
SEVEN_ZIP_PATH="/c/Program Files/7-Zip/7z.exe"
# ===========================

echo "📦 Building ReactJS app..."
$BUILD_CMD || { echo "❌ Build failed!"; exit 1; }

echo "🗜️ Compressing $FOLDER_NAME into $ZIP_NAME using 7-Zip..."
"$SEVEN_ZIP_PATH" a -tzip "$ZIP_NAME" "$FOLDER_NAME" > /dev/null || {
  echo "❌ 7-Zip compression failed."; exit 1;
}

echo "🔌 Connecting to server to remove old files if they exist..."
"$PLINK_PATH" -batch -ssh -P $REMOTE_PORT -pw "$PASSWORD" "${REMOTE_USER}@${REMOTE_HOST}" bash <<EOF
cd "$REMOTE_PATH" || exit

if [ -d "$FOLDER_NAME" ]; then
  echo "🧹 Removing old folder: $FOLDER_NAME"
  rm -rf "$FOLDER_NAME"
fi

if [ -f "$ZIP_NAME" ]; then
  echo "🧹 Removing old zip: $ZIP_NAME"
  rm -f "$ZIP_NAME"
fi
EOF

echo "📤 Uploading $ZIP_NAME to server..."
"$PSCP_PATH" -P $REMOTE_PORT -pw "$PASSWORD" "$ZIP_NAME" "${REMOTE_USER}@${REMOTE_HOST}:$REMOTE_PATH/"

echo "🗃️ Extracting zip on server..."
"$PLINK_PATH" -batch -ssh -P $REMOTE_PORT -pw "$PASSWORD" "${REMOTE_USER}@${REMOTE_HOST}" \
"cd \"$REMOTE_PATH\" && unzip -o \"$ZIP_NAME\" && rm -f \"$ZIP_NAME\""

echo "✅ Deployment complete!"
