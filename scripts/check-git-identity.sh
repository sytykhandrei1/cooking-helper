#!/bin/sh
set -eu

expected_name='sytykhandrei1'
expected_email='andrei3758@gmail.com'
expected_prefix="$expected_name <$expected_email>"

author_ident=$(git var GIT_AUTHOR_IDENT)
committer_ident=$(git var GIT_COMMITTER_IDENT)

case "$author_ident" in
  "$expected_prefix"*) ;;
  *)
    echo "ERROR: commit author must be $expected_prefix" >&2
    echo "Actual author: $author_ident" >&2
    exit 1
    ;;
esac

case "$committer_ident" in
  "$expected_prefix"*) ;;
  *)
    echo "ERROR: commit committer must be $expected_prefix" >&2
    echo "Actual committer: $committer_ident" >&2
    exit 1
    ;;
esac

echo "Git identity verified: $expected_prefix"
