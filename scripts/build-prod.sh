#!/bin/bash

echo "[ENTER-COMMIT-MESSAGE]"
read commit_message


echo "[STATING-FILES-PROCESSING]"
git add .
echo "[STAGING-FILES-SUCCESS]"


echo "[COMMITTING-CHANGES]"
git commit -m "$commit_message"
echo "[COMMIT-SUCCESS]"


echo "[PUSHING-CHANGES-TO-ORIGIN-BH-TISAN]"
git push origin bh-tisan
echo "[PUSH-SUCCESS]"


echo "[CHECKING-OUT-MAIN-BRANCH]"
git checkout main
echo "[CHECKOUT-SUCCESS]"


echo "[MERGING-MAIN-BRANCH]"
git merge bh-tisan
echo "[MERGE-SUCCESS]"


echo "[PUSHING-CHANGES-TO-ORIGIN-MAIN]"
git push origin main
echo "[PUSH-SUCCESS]"


echo "[CHECKING-OUT-BH-TISAN-BRANCH]"
git checkout bh-tisan
echo "[CHECKOUT-SUCCESS]"