---
title: Contact
sections:
  - type: section_contact
    template: section_contact
    section_id: contact
    title: Contact
    content: >
      We love helping practices seeking support with cases being read by a
      Radimal DACVR


      Reports typically returned the same day


      48-hour turnaround or it’s on us :)


      **Reading Hours (EST)**


      8am-8pm Monday-Friday

      8am-2pm Saturday

      except major holidays


      Any case submitted outside of normal working hours will be read the
      following business day.
    background: gray
    form_id: contactForm
    form_fields:
      - type: form_field
        template: form_field
        input_type: text
        name: name
        label: Name
        is_required: true
      - type: form_field
        template: form_field
        input_type: email
        name: email
        label: Email
        is_required: true
      - type: form_field
        template: form_field
        input_type: select
        name: subject
        label: Subject
        default_value: Please select
        options:
          - Error on the site
          - Sponsorship
          - Other
      - type: form_field
        template: form_field
        input_type: textarea
        name: message
        label: Message
      - type: form_field
        template: form_field
        input_type: checkbox
        name: consent
        label: >-
          I understand that this form is storing my submitted information so I
          can be contacted.
        is_required: true
    submit_label: Send Message
seo:
  type: stackbit_page_meta
  template: stackbit_page_meta
  title: Contact
  description: This is the contact page
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Contact
      keyName: property
    - name: 'og:description'
      value: This is the contact page
      keyName: property
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Contact
    - name: 'twitter:description'
      value: This is the contact page
template: landing
---
