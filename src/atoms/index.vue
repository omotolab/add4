<template lang="pug">
div
    div.uk-background-muted
        div.uk-container
            div
                field(
                    icon="search"
                    v-model="request"
                    :action="() => handleRequest(request)"
                )
            // div(uk-height-match).uk-grid.uk-grid-small(v-if="response")
                div.uk-width-expand.uk-margin
                    pre.uk-placeholder.uk-card.uk-card-small.uk-card-body.uk-border-rounded.uk-height-max-medium.uk-overflow-auto
                        code.uk-height-1-1 {{ response }}
    div.uk-section.uk-section-small
        div.uk-container
            .uk-input.uk-form-large.uk-flex.uk-flex-between
                button.uk-button.uk-label r/freelance
                input(placeholder="Search").uk-input
    div.uk-section.uk-section-small.uk-padding-remove-bottom
        div.uk-container
            div(uk-height-match v-if="response").uk-grid.uk-grid-small
                div.uk-width-expand
                    form
                        ul.uk-list.uk-list-small
                            li(v-for="result in response.result.projects")
                                div(
                                    style="cursor: pointer"
                                    @click="addPreview(result)" 
                                    :class="highlightItem(result)"
                                    ).uk-card.uk-card-small.uk-card-body.uk-flex
                                        div
                                            strong.uk-text-small {{ `${result.title}`}}
                                            div.uk-text-meta {{ `${result.preview_description}...`}}
                                        div
                                            input(
                                                class="uk-checkbox" 
                                                type="checkbox" 
                                                :checked="isSelected(result, selected)"
                                                @click="toggleSelection(result)")
                div.uk-width-auto
                    div.uk-width-large
                        div(uk-sticky="offset: 40")
                            reviewer( 
                                v-if="preview" 
                                :preview="preview"
                                :selected="isSelected(preview, selected)"
                                :addSelection="toggleSelection"
                            )
                            reporter(  
                                :items="selected"
                                :removeAction="removeSelection"
                            )
                    // calendar(:inDate="date" )
                // card(description="Hello").uk-card-small
                // div.uk-width-expand
                    div.uk-overflow-auto
                        ul(v-if="result.length > 0").uk-list
                            li(v-for="item in result")
                                card(
                                    :title="item.name"
                                    :description="item.id"
                                ).uk-margin
                                    // template(v-slot:footer)
                                        ul
                                            li(v-for="job in jobs[result.id]")
                                                // div {{ job.id }}
                                                // div {{ job.seo_url }}
                                                // div {{ job.job.category }}
                                                div {{ job.name + " (" + job.id + ")" }}
                // ul.uk-section(v-if="categories.length > 0")
                    li(v-for="result in categories").uk-list
                        card(
                            :title="result.name"
                            :description="result.id"
                        ).uk-margin
                            template(v-slot:footer)
                                ul
                                    li(v-for="job in jobs[result.id]")
                                        // div {{ job.id }}
                                        // div {{ job.seo_url }}
                                        // div {{ job.job.category }}
                                        div {{ job.name + " (" + job.id + ")" }}
                // ul.uk-section(v-if="projects.length > 0")
                    li(v-for="result in projects").uk-list
                        card(
                            :title="result.title"
                            :description="result.preview_description"
                        ).uk-margin
                            
                            template(v-slot:header)
                                // span {{ result }}
                                // span {{ result.currency.exchange_rate }}
                                // span {{ result.bidperiod }}
                                // span {{ result.active }}
                                span {{ result.time_submitted }}
                                span {{ result.time_updated }}
                                span {{ result.time_free_bids_expire }}
                                span {{ result.submitdate }}
                            template(v-slot:footer)
                                div.uk-flex
                                    div.uk-flex.uk-flex-between
                                        div
                                            span {{ result.currency.sign }}
                                            span {{ result.budget.minimum }}
                                        div
                                            span {{ result.currency.sign }}
                                            span {{ result.bid_stats.bid_avg }}
                                        div
                                            span {{ result.currency.sign }}
                                            span {{ result.budget.maximum }}
                                    div
                                        div 
                                            span {{ result.bid_stats.bid_count }}
                // div.uk-width-auto.uk-height-viewport
                    div.uk-container
                        // h1 
                            span(v-if="results && results.length !== 0") {{ results + " " }}
                            span Opportunit
                            span(v-if="results && results.length !== 1") ies
                            span(v-else) y
                        calendar(:inDate="date" )                                


</template>
<script>
export default {
    data() {
        return {
            date: new Date,
            preview: null,
            request: '',
            response: null,
            results: null,
            projects: [],
            categories: [],
            selected: [],
            jobs: [],
            result: [],
            service: {
                freelancer: 'https://www.freelancer.com/api'
            },
            query: {
                categories: 'projects/0.1/categories',
                jobs: 'projects/0.1/jobs',
                categories_with_jobs: 'projects/0.1/categories/?job_details=true',
                design: 'projects/0.1/categories/?categories[]=3&job_details=true',
                illustration: 'projects/0.1/jobs/?jobs[]=170&job_details=true',
                custom_elise: '/projects/0.1/projects/active?jobs[]=170&jobs[]=2074&jobs[]=57&jobs[]=1013&jobs[]=2129&jobs[]=1005&languages[]=en&sort_field=bid_avg_usd',
                custom: 'projects/0.1/projects/active/?compact=&limit=3&project_types%5B%5D=fixed&max_avg_price=500%3D&min_avg_price=250&query=django'
            },
            recipe: [
                {
                    name: "Select freelancer service",
                    call: "https://www.freelancer.com/api"
                },
                {
                    name: "Look up categories in the freelancer service",
                    call: "projects/0.1/categories"
                },
                {
                    name: "Look up skills in Design category",
                    call: "categories/?categories[]=3&job_details=true"
                },
                {
                    name: "Find active projects which include the Illustration skillset",
                    call: "projects/active?jobs[]=170"
                },
                {
                    name: "Add other skills to your search query",
                    call: "&jobs[]=2074&jobs[]=57&jobs[]=1013&jobs[]=2129&jobs[]=1005"
                },
                {
                    name: "Filter by language",
                    call: "&languages[]=en"
                },
                {
                    name: "Sort by highest average bid",
                    call: "&sort_field=bid_avg_usd"
                }
            ]
        }
    },
    created() {
        this.request = `${this.service.freelancer}/${this.query.custom_elise}`
        this.handleRequest(this.request)
    },
    methods: {
        handleRequest(input) {
            // alert(input)
            this.fetchProjects(input)
        },
        addSelection(project) {
            const index = this.selected.indexOf(project)
            if (index === -1) {
                this.selected.push(project)
            }
        },
        removeSelection(project) {
            const index = this.selected.indexOf(project)
            if (index > -1) {
                this.selected.splice(index, 1);
            }
        },
        toggleSelection(project) {
            this.isSelected(project, this.selected) ? this.removeSelection(project) : this.addSelection(project)
        },
        addPreview(project) {
            this.preview = project
        },
        removePreview() {
            this.preview = null
        },
        isSelected(obj, array) {
            return (array.indexOf(obj) != -1);
        },
        isPreview(project) {
            return this.preview.id === project.id
        },
        highlightItem(project) {
            const isSelected = this.isSelected(project, this.selected) ? 'uk-background-muted' : 'uk-card-hover'
            const isPreview = this.preview && this.isPreview(project) ? 'uk-card-default' : ''
            return isSelected + ' ' + isPreview
        },
        async fetchProjects(query) {
            const response = await this.$axios.$get(query)
            console.log(response)
            this.response = response
            this.results = response.result.total_count
            this.projects = response.result.projects
            this.categories = response.result.categories
            this.jobs = response.result.jobs
            this.result = response.result
        }
    }
}
</script>