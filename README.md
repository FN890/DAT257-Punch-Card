# DAT257-Punch-Card - Booking System

# Git Workflow Steps

1. **git checkout master** You are probably already on local master

2. **git pull** (= **git pull origin master**) To update local master

3. **git checkout -b myTask** Create and switch to branch **myTask**

4. Optional: Use **git branch -a** to show all branches and git status to see what branch you’re on.

5. Do some coding (some well defined (sub) task) and then go to 6 (don't code too long before doing a commit, do it regularly).

6. **git commit -a -m “…a sensible message…”** Commit on branch **myTask**

7. Goto 5. until task finished (a task should also not take too long, otherwise it should have been divided into subtasks).

8. Ok, assume that the task is finished. The project should be compile without any errors (and warnings) and, very important, all test should pass.

9. Now we start to integrate our changes into the project:
   
   a. **git checkout master**

   b. **git pull**

   c. **git checkout myTask**

   d. **git rebase master** (optional, can be used to clean up branch history (Länkar till en externa sida.))

   e. **git checkout master**

   f. **git merge myTask**
   
   g. **git push** (= **git push origin master**) Push to remote repo
   
   h. **git branch -d myTask** Delete branch
   
Now everybody should be able to see your contribution (i.e. **git pull**).

Continue with next task, go to 2.

