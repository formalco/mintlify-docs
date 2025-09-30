---
title: 'SSH'
---

<span className="page-description">Troubleshooting SSH issues</span>

import FAQStructuredData from '../../../src/components/faq/faq';

export const faqs = [
  {
    question: 'Error: `too many authentication failures`',
    answer:
      "If you face the following error: `Error: too many authentication failures` when SSHing into a Connector, it means that you have reached the limit of ssh keys and the authentication fails even before reaching password authentication. You can resolve this by adding the following flags to your ssh command: `-o PubkeyAuthentication=no -o PreferredAuthentications=password`.",
  },
];

<FAQStructuredData faqs={faqs} />