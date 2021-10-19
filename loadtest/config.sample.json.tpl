[
  {
    "id": "ui",
    "parallelism": ${PARALLEL_CONTAINERS},
    "duration": ${RUN_DURATION},
    "command": "docker run -e PARALLEL_ID --env-file ./loadtest/env/${WORKSPACE}.env e2etests npm run test:loadtest-ui"
  },
  {
    "id": "noui",
    "parallelism": ${PARALLEL_CONTAINERS},
    "duration": ${RUN_DURATION},
    "command": "docker run -e PARALLEL_ID --env-file ./loadtest/env/${WORKSPACE}.env e2etests npm run test:loadtest-noui"
  }
]
