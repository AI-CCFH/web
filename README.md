<h1 align="center"><img src='https://www.foo.software/content/images/2020/08/react-next.png' height='150'><br>@ai-ccfh/web</br></h1>
<p align="center">the front-facing interface of team AI-CCFH's project.<br>manage your logistics business with efficiency from modern tools and <i>style</i></b><br><i>made at Humanitarian Logistics Hackathon 2025.</i></p>

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---
## Information about this project

Let's pay more attention to our environment state, poverty and the state of unused food. How are these related, even? Well, we know waste food. And there are too many households vulnurable to this issue. There are virtually zero effective solution in the world right now due to uncollectable data and inefficient logistics works.

We kind of made up *our own scenario* where there is a company dealt with the food and what to do with it as a plan. Its name is FoodBank. We try to make up a very extensive service with very extensive plans, it turned out quite well, and we planned to have a web interface for it.

This Hackathon, we needed to propose a solution to improve the efficiency, transparency, and flexibility in "last-mile" food transportation - from collection points to recipients. We wanted to make this solution a very throughout one.

## Tech stacks
### Language

This project uses a single language, that is TypeScript. TypeScript helps reduce our typing errors, so we can focus on making it work.

One of our team members knew how to make things work with HTML, CSS and JS - but that simply wasn't modern enough to be used in the modern day standards.

### Database

We're intending to use PostgreSQL as a backend server database implemented in Python and using Flask to do this. For now, this repository only contains mocked data to visualize how this should work. We made it so that it becomes a very trivial task to move the mocked infrastructure to the actual database implementation later on.

### Runtime

This project is built and deployed using Next.js and Vercel, respectively. The hosted version of this website is on https://ai-ccfh.vercel.app - thank you for their amazing infrastructures and openness to our problems and solutions proposed.

### Project size

It's... quite heavy, once you get to run it locally. We developed this on Github Codespaces, which is great if somebody of our team has a weak machine to deal with this modern infrastructures.

## Local development setup

Get `next` and `vercel` if you will deploy this later. `next` is a must, and `pnpm` is also a must to run this as there are peer dependecies that we need to cater to.

## Project structure
The file tree is fairly simple in construction.
```bash
@ai-ccfh/web
├── ...
├── README.md
├── components     # the main components used
├── hooks          # react hooks
├── lib            # some core fn
├── app            # routes and functionalities
│   ├── ...
│   ├── dashboard  # the dashboard for different roles
│   ├── product
│   │   └── scan   # qrcode extraction
│   ├── login      # login stuff
│   └── signup     # signup stuff
├── styles         # some random styles
└── 
```
The project follows the basic React application structuring.

## Code License & Contribution
[MIT](/LICENSE). Nothing too beautiful and stuff I guess.

To contribute, maybe just make an issue or pull request. We might not check though after the hackathon's over (the day after the publish of this repository)