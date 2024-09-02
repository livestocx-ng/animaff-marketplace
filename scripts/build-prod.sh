#!/bin/bash

echo "[ENTER-COMMIT-MESSAGE]"
read commit_message


echo "[STATING-FILES-PROCESSING]"
git add .
echo ""
echo "[STAGING-FILES-SUCCESS]"
echo ""


echo "[COMMITTING-CHANGES]"
git commit -m "$commit_message"
echo ""
echo "[COMMIT-SUCCESS]"
echo ""


echo "[PUSHING-CHANGES-TO-ORIGIN-BH-TISAN]"
git push origin bh-tisan
echo ""
echo "[PUSH-SUCCESS]"
echo ""


echo "[CHECKING-OUT-MAIN-BRANCH]"
git checkout main
echo ""
echo "[CHECKOUT-SUCCESS]"
echo ""


echo "[MERGING-MAIN-BRANCH]"
git merge bh-tisan
echo ""
echo "[MERGE-SUCCESS]"
echo ""


echo "[PUSHING-CHANGES-TO-ORIGIN-MAIN]"
git push origin main
echo ""
echo "[PUSH-SUCCESS]"
echo ""


echo "[CHECKING-OUT-BH-TISAN-BRANCH]"
git checkout bh-tisan
echo ""
echo "[CHECKOUT-SUCCESS]"
echo ""