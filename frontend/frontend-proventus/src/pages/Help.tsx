const Help = () => {
  const headerTwoClasses = "py-2 mt-2 text-slate-600";
  return (
    <div>
      <h1>Help Page</h1>
      <h2 className={headerTwoClasses}>Add Project</h2>
      <p>
        First, you should create a project by clicking on "create project." Add
        a name for the project and an expected project duration date. Next, go
        to the projects page and click on the project's name.
      </p>
      <h2 className={headerTwoClasses}>Project page</h2>
      <p>
        Here is where your tasks and your Kanban will be displayed. You can add
        or remove columns, add tasks, and start the timer for your tasks.
      </p>
      <h2 className={headerTwoClasses}>Edit mode</h2>
      <p>
        By clicking on "edit mode," you can add new columns. It would be
        interesting to add columns like "doing" and "done" to have a classic
        Kanban.
      </p>
      <h2 className={headerTwoClasses}>Add Tasks</h2>
      <p>
        You can add tasks by clicking on "add task." The new task will be added
        to the first column, and you can move tasks by dragging them. - The
        drag-and-drop feature does not work on mobile devices due to the
        different drag-and-drop API limitations.
      </p>
      <p className="mt-4">
        If you have any questions or suggestions, please go to our{" "}
        <a
          className="text-teal-500 underline hover:text-teal-700 hover:font-black"
          href="https://github.com/nandumoura/proventus/issues"
        >
          GitHub page{" "}
        </a>
        and open an issue by clicking on{" "}
        <a
          className="text-teal-500 underline hover:text-teal-700 hover:font-black"
          href="https://github.com/nandumoura/proventus/issues/new"
        >
          "New Issue."{" "}
        </a>
        Don't forget to provide details of your problem so that I can reproduce
        it effectively.
      </p>
    </div>
  );
};

export default Help;
