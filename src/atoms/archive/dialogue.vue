<template>
    <div class="myForm"></div>
</template>
<script>
import { ConversationalForm } from 'conversational-form';

export default {
    name: "DialogueForm",
    data() {
        return {
            answers: {},
            options: {
                theme: 'dark',
                preventAutoFocus: true,
                flowStepCallback: this.flowStepCallback,
                submitCallback: this.submitCallback
            },
            tags: [
                {
                    'tag': 'input',
                    'type': 'text',
                    'name': 'firstname',
                    'cf-questions': 'What is your first name?'
                },
                {
                    'tag': 'input',
                    'type': 'text',
                    'name': 'lastname',
                    'cf-questions': 'Hi {firstname}!, what is your last name?'
                }
            ]
        }
    },
    methods: {
        setupForm: function () {
            const { tags, options } = this
            this.cf = ConversationalForm.startTheConversation({
                options,
                tags
            });
            this.$el.appendChild(this.cf.el);
        },
        flowStepCallback: function (dto, success, error) {
            // console.log("dto....", dto, success, error);
            const data = this.cf.getFormData(true)
            
            this.answers[dto.tag.domElement.name] = {
                questions: dto.tag.questions,
                answer: dto.text
            }

            console.log(this.cf.getFormData(true))

            /*
                The concept is that this could just as well be an AJAX request to your server where the response would yield a new qeustion that would be injected into the form.
            */

            if (data['firstname'] && data['lastname']) {
                this.cf.addRobotChatResponse("{firstname} {lastname}, did I get that correct?")
                this.cf.addTags(this.newTags);
            }

            // We assume every answer is valid. If that wasnt the case we would call error()
            success();
        },
        submitCallback: function () {
            const { newTags } = this
            var formDataSerialized = this.cf.getFormData(true);

            console.log("Formdata, obj:", formDataSerialized);
            this.cf.addRobotChatResponse("You are done. Check the dev console for form data output.")
;
        }
    },
    computed: {
        newTags() {
            return [
                {
                    "tag": "select",
                    "name": "country",
                    "cf-questions": "Where are you from?",
                    "cf-input-placeholder": "country code",
                    multiple: false,
                    children: [
                        { tag: "option", "cf-label": "USA", value: "usa" },
                        { tag: "option", "cf-label": "UK", value: "uk" },
                        { tag: "option", "cf-label": "NL", value: "nl" },
                        { tag: "option", "cf-label": "NG", value: "ng" }
                    ]
                },
                {
                    "tag": "select",
                    "name": "image-preference",
                    "cf-questions": "What do you want to eat?",
                    "cf-input-placeholder": "food item",
                    multiple: false,
                    children: [
                        { tabindex: "1", tag: "option", "cf-label": "AI", value: "0", "cf-image": "https://space10io-zhjgfejx8sl.netdna-ssl.com/content/uploads/2016/10/julesslutsky1-400x265.jpg" },
                        { tabindex: "2", tag: "option", "cf-label": "Meatball", value: "1", "cf-image": "https://space10io-zhjgfejx8sl.netdna-ssl.com/content/uploads/2015/12/tomorrows_meatball_08-400x265.jpg" },
                    ]
                },

                {
                    // select group
                    "tag": "select",
                    "name": "country",
                    "cf-questions": "First tag value: {firstname}&& + follow-up",
                    "cf-input-placeholder": "Some copy",
                    "isMultiChoice": false,
                    "children": [
                        {
                            "tag": "option",
                            "cf-label": "USA",
                            "value": "usa"
                        },
                        {
                            "tag": "option",
                            "cf-label": "UK",
                            "value": "uk"
                        }
                    ]
                },
                {
                    // basic tag
                    "tag": "input",
                    "type": "text",
                    "cf-questions": "Tag is injected at runtime, data from 'webservice', check source of <a href='formless.html' style='text-decoration:underline'>formless.html</a>",
                    "cf-error": "Inject some text"
                },
                {
                    // tag group
                    "tag": "fieldset",
                    "type": "Checkboxes",
                    "cf-input-placeholder": "Tag group is injected",
                    "cf-questions": "Choose an injected tag",
                    "children": [
                        {
                            "tag": "input",
                            "type": "checkbox",
                            "name": "checkboxes-buttons-1",
                            "cf-label": "checkbox-x1",
                            "checked": "checked"
                        },
                        {
                            "tag": "input",
                            "type": "checkbox",
                            "name": "checkboxes-buttons-1",
                            "cf-label": "checkbox-x2"
                        }
                    ]
                }

            ]
        }
    },
    mounted: function () {
        this.setupForm()
    },
}
</script>
<style>
.myForm {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>