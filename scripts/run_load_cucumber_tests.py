import sys
import subprocess
import uuid

def run_tests(no_workers, no_runs):
    f = open("scripts/tests_to_run.txt", "r")
    tests_to_run = f.read().split("\n")

    print("We gonna be running these tests:", tests_to_run)
    
    for index in range(len(tests_to_run)):
        uniqueID = str(uuid.uuid4())
        newFolder = tests_to_run[index] + uniqueID
        subprocess.run("mkdir " + newFolder, shell=True)
        subprocess.run("cp -R " + tests_to_run[index] + "/ " + newFolder, shell=True)
        tests_to_run[index] = newFolder

    if no_runs == 0: # ad infinitum
        while True:
            subprocess.run(f"RUN_PARALLEL=1 npm run test:file-parallel {str(no_workers)} {' '.join(tests_to_run)}", shell=True)
    else: # I know I do not need this, but its slightly easier to read
        for i in range(no_runs):
            subprocess.run(f"RUN_PARALLEL=1 npm run test:file-parallel {str(no_workers)} {' '.join(tests_to_run)}", shell=True)

    for index in range(len(tests_to_run)):
        subprocess.run("rm -r " + tests_to_run[index], shell=True)

if "__main__" == __name__:
    no_runs = 1
    no_workers = 3
    run_tests(no_workers, no_runs)
