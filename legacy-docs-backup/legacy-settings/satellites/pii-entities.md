---
title: "PII Entities"
---

<span className="page-description">What are the PII entities detected by Formal Satellite?</span>

## PII entities supported

| Name               | Description                                |
| ------------------ |  ------------------------------------------ | 
| **aws_access_key**   | A unique identifier that's associated with a secret access key; the access key ID and secret access key are used together to sign programmatic AWS requests cryptographically.       |
| **aws_secret_key**      |  A unique identifier that's associated with an access key; the access key ID and secret access key are used together to sign programmatic AWS requests cryptographically.  | 
| **pin**      |  A 4-digit personal identification number (PIN) that allows someone to access their bank account information.  | 
| **url**      |  A web address, such as www.example.com.  | 
| **age**      |  An individual's age, including the quantity and unit of time. For example, in the phrase "I am 40 years old," Amazon Comprehend recognizes "40 years" as an age.  | 
| **email_address**      | An email address, such as marymajor@email.com.  | 
| **phone_number**      | A phone number. This entity type also includes fax and pager numbers.  | 
| **name**      | An individual's name. This entity type does not include titles, such as Mr., Mrs., Miss, or Dr. It does not apply this entity type to names that are part of organizations or addresses. For example, "John Doe Organization" is recognized as an organization, and "Jane Doe Street" is recognized as an address.   | 
| **location**      | A physical address, such as "100 Main Street, Anytown, USA" or "Suite #12, Building 123". An address can include a street, building, location, city, state, country, county, zip, precinct, neighborhood, and more. bank_account_number  | 
| **bank_account_number**      | A US bank account number. These are typically between 10 - 12 digits long, also recognized bank account numbers when only the last 4 digits are present.  | 
| **bank_routing_number**      | A US bank account routing number. These are typically 9 digits long; also recognizes routing numbers when only the last 4 digits are present.  | 
| **credit_card_number**      | The number for a credit or debit card. These numbers can vary from 13 to 16 digits in length, but credit or debit card numbers when only the last 4 digits are present can be recognized.  | 
| **credit_card_cvv**      | A 3-digit card verification code (CVV) that is present on VISA, MasterCard, and Discover credit and debit cards. In American Express credit or debit cards, it is a 4-digit numeric code.  | 
| **credit_card_expiry**      | The expiration date for a credit or debit card. This number is usually 4 digits long and formatted as month/year or MM/YY. For example, expiration dates such as 01/21, 01/2021, and Jan 2021.  | 
| **ip_address**      | An IPv4 address, such as 198.51.100.0.  | 
| **mac_address**      | A media access control (MAC) address is a unique identifier assigned to a network interface controller (NIC).  | 
| **ssn**      | A Social Security Number (SSN) is a 9-digit number that is issued to US citizens, permanent residents, and temporary working residents. Social Security Numbers are recognized when only the last 4 digits are present.  | 
| **password**      | An alphanumeric string that is used as a password, such as "very20special#pass".  | 
| **passport_number**      | A US passport number. Passport numbers range from 6 - 9 alphanumeric characters.  | 
| **date_time**      | A date can include a year, month, day, day of week, or time of day. For example, "January 19, 2020" or "11 am" as dates. Partial dates will be recognized, date ranges, and date intervals. It will also recognize decades, such as "the 1990s".  | 
| **driver_id**      | The number assigned to a driver's license, which is an official document permitting an individual to operate one or more motorized vehicles on a public road. A driver's license number consists of alphanumeric characters.  | 