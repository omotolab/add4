<template lang="pug">
div
    section.uk-section.uk-section-primary
        div.uk-container
            h1.uk-h1 {{ title }}
            p {{ hero.description }}
    section(v-for="section in sections").uk-section
        div.uk-container
            h1.uk-h1 {{ section.title }}
            p {{ section.description }}
            template(v-if="section.action && section.action.route")
                nuxt-link.uk-button.uk-button-primary(:to="section.action.route") {{ section.action.name }}
            template(v-if="section.action && section.action.function")
                button.uk-button.uk-button-primary(@click="section.action.function") {{ section.action.name }}

            template(v-if="section.sections")
                ul.uk-list
                    li(v-for="section in section.sections")
                        div
                            h2.uk-h2 {{ section.title }}
                            p {{ section.description }}
            template(v-if="section.tabs")
                ul(uk-switcher).uk-subnav.uk-subnav-pill
                    li(v-for="section in section.tabs")
                        a(href="#") {{ section.label }}
                ul.uk-switcher.uk-margin
                    li(v-for="section in section.tabs")
                        div
                            h2.uk-h2 {{ section.title }}
                            p {{ section.description }}

</template>
<script>
export default {
    data() {
        return {
<<<<<<< Updated upstream
            sections: [
                {
                    title: "Learn the ropes",
                    description: "Thismedium replaces lists with context signatures and interactive graphs. It’s a better (and more fun) way to find what you need online.",
=======
            points: 0,
            signals: [
                [1,2,2],
                [2,1,1],
                [2,3,4],
                [3,3,5],
            ],
            hero: {
                    verbs: {
                        1: 'See', 2: 'Cut', 3: 'Get'
                    },
                    preps: {
                        1: "out",
                        2: "through",
                        3: "to",
                    },
                    nouns: {
                        1: 'the mess',
                        2: 'the void',
                        3: 'the clutter',
                        4: 'the chase',
                        5: 'what matters'
                    },
                    description: "Thismedium replaces ~cluttered~ endless scrolling, with a clear overview of answers. It’s a shortcut to finding what you were looking for.",
>>>>>>> Stashed changes
                    action: {
                        name: 'Get Started',
                        route: '/home/'
                    }
                },
                {
                    title: "Cut through the *",
                    sections: [
                        {
                            title: "For Freelancers & Service Providers",
                            description: "Get started as a service provider, dive right into the best projects for you and get help beating the odds. Thismedium finds opportunities for ambitious freelancer across multiple platforms."
                        },
                        /* {
                            title: "For Job Providers & Project Managers",
                            description: "Build confidence with hands-on learning. You'll get to see concepts visually, interact with key ideas, and solve challenging problems that get you to really think."
                        },
                        {
                            title: "For Researchers & Data analysts",
                            description: "Enjoy fun storytelling, guided problem solving, and making lots of mistakes while playing. On Brilliant, your natural curiosity will drive you, not the threat of a test."
                        } */
                    ],
                },
                {
                    title: "See connections and opportunities in a new way",
                    description: "All of our service gateways are crafted by developers, designers, and freelance professionals with years of experience cutting through the noise.",
                    tabs: [
                        {
                            label: "Freelancers (beta)",
                            title: "For Freelancers & Service Providers",
                            description: "Get started as a beginner with the fundamentals, or dive right into intermediate and advanced courses for professionals. Brilliant has courses for ambitious people of all ages."
                        },
                        {
                            label: "Employers (coming soon)",
                            title: "For Team Builders & Headhunters",
                            description: "Build a confident team. You'll get to see potential candidates in an interactive network, interact with potential candidates, and see possible collaborations far quicker than filtering through a list."
                        },
                        /* {
                            label: "Content Creators",
                            title: "For Youtubers & Influencers",
                            description: "Enjoy fun storytelling, guided problem solving, and making lots of mistakes while playing. On Brilliant, your natural curiosity will drive you, not the threat of a test."
                        },
                        {
                            label: "Researchers",
                            title: "For Researchers & Data analysts",
                            description: "Enjoy fun storytelling, guided problem solving, and making lots of mistakes while playing. On Brilliant, your natural curiosity will drive you, not the threat of a test."
                        }, */
                    ],
                }
            ]
        }
    },
    computed: {
        title() {
            const x = this.points
            const y = this.signals
            const verb = this.hero.verbs[y[x][0]]
            const prep = this.hero.preps[y[x][1]]
            const noun = this.hero.nouns[y[x][2]]

            return `${verb} ${prep} ${noun}.`
        }
    },
    mounted() {
        let _this = this
       /*  setInterval(   
            function(){ 
                if(_this.points.length === _this.signals.length - 1) {
                    _this.counter = 0
                } else {
                    _this.counter++
                }
             }, 3000
        ); */
    }
}
</script>