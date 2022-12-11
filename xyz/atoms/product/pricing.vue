<template lang="pug">
  h1 Pricing plans @thismedium.
</template>
<script>
export default {
  data() {
    return {
      plans: null,
      features: null
    }
  },
  mounted() {
    this.plans = [
      ['open', 'Introdutory plan for beginners & teachers']
      ['studio', 'The basics for individual analysts'],
      ['partner', 'Collaborate with us to bring your service out to the market.']
    ],
    this.roles = [
      'trader',
      'editor',
      'developer'
    ],
    this.features = [
      'VISUAL ANALYSIS',
      'visualisation builder',
      'sql editor',
      'graphql editor',
      'custom html dashboard',
      'calculated fields',
      'filters & parameters',
      'COLLABORATION',
      'users per account*',
      'JSON & CSV API Integrator*',
      'GET & Post requests*',
      'Unlimited API Requests**',
      'Unlimited Strategies*',
      'Save API Requests*',
      'Schedule API Requests*',
      'Multiple URL in the same strategy*',
      'Reference value of a cell in a google sheet, in your strategy*',
      'Custom LogicTo[] function*+',
      'Convert to javascript',
      'scheduled reports*',
      'email, slack, discord, integration*',
      'reusable queries*',
      'white-label embed+',
      'external sharing+',
      'custom theme*',
      'SECURITY & AUTOMATION',
      'secure database credential control',
      'single sign on Google/Slack',
      'single sign on Microsoft*',
      'github integration*',
      'permissioninig*',
      'rest api*',
      'webhooks',
      'SUPPORT',
      'Help Site & Developer Portal',
      'Live in app chat**',
      'Dedicated Success Manager**',
      'Dedicated Onboarding**',
      'Usage & Audit Logs'

    ]

  }
}
</script>