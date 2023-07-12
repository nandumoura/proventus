# Proventus APP

Proventus is a project management app with task time tracking, focused on serving freelancers. While there are various solutions in the market with Kanban boards and project management features, none of them natively include a timer to track task time. To do so, you would need to install a third-party add-on.

The project is open-source and hosted on [Deta Space](https://deta.space/docs/en). You can use and host it for free. It's important to note that Deta Space aims to be a personal cloud and may not cater to multiple users in the future. They may create a system focused on multiple users to generate revenue.

The process is straightforward. Please see the tutorial below.

## Suggestions or Errors

If you have any suggestions for changes, please contact me and share your ideas. As I don't have much experience in project management, I have added the features that make the most sense to me and that, in my opinion, are missing in other projects. However, I would like this software to meet the needs of other people and help other freelancers. You can suggest improvements or report errors by creating a new issue.

### Errors

If you are reporting errors, please try to explain how the error occurred and provide additional information about your browser, device, and if possible, a YouTube video link or a descriptive image of the error.

## Acknowledgments

I would like to express my gratitude to all the developers and contributors of the libraries and tools listed below, as they greatly facilitate the lives of software developers.

## ReactJS

[ReactJS](https://react.dev/) This is my primary choice for frontend development, mostly due to the community and the ease of quickly building interfaces.

## Deta Space

[Deta Space](https://deta.space/docs/en) During the course of the project, I came across Deta Space and their concept of a personal cloud, which was something I had never seen before. I really liked the project and decided to host it with them, transforming it into a project management system focused on freelancers. This way, freelancers can track the time spent on their projects and later review their expenditure estimates to create budgets and improve their pricing approach.

## Float UI

Some visual elements were taken from [FloatUI](https://www.floatui.com/).

## Tailwind

[TailwindCSS](https://tailwindcss.com/) This has been my personal choice for styling ReactJS projects.

## Redux Toolkit

[Redux Toolkit](https://redux-toolkit.js.org/) Redux is practically an industry standard for state management in React applications. At the beginning of the project, I also tested Zustand and Next.js, but Next.js ended up increasing the complexity of the project too much. Handling state between server-side and client-side components took up a lot of time. Therefore, I decided to switch to using Express.js for the server and pure React. With this choice, Redux seemed more interesting to me.

## RTK Query

[Rtk Query](https://redux-toolkit.js.org/rtk-query/overview) This is a solution developed by the Redux team to handle caching and data fetching. It's my first time using it, and it seems to solve most of the problems related to caching and fetching.

## React DnD

[React DnD](https://react-dnd.github.io/react-dnd/docs/overview) It's a drag-and-drop library for ReactJS that is simple, easy to implement, and well-documented.