// Single source of truth for page copy. Text is unchanged from the previous site.
// `logo` is a file name in content/images (resolved by src/hooks/useLogos.js).

export const profile = {
    name: "Nguyen Trung Nghia",
    nickname: "Ren",
    fullName: "Nguyen Trung Nghia (Ren)",
    roles: ["Data Engineer", "DataOps", "MLOps"],
    location: "Ho Chi Minh City",
    locationFull: "Ho Chi Minh City, Vietnam",
    currentCompany: "Home Credit Vietnam",
    avatar: "lego-dummy.jpg",
};

export const aboutData = {
    eyebrow: "NGUYEN TRUNG NGHIA (REN)",
    paragraphs: [
        "Data Engineer with 2 years of production experience building and optimizing large-scale data pipelines across healthcare, marketing analytics, and consumer finance. Currently at Home Credit Vietnam, building a near-real-time Customer Profile platform with Kafka, SAS ESP/RTDM, and Oracle PL/SQL for real-time CRM campaign targeting. Previously at Hello Health Group, orchestrated ETL workflows with Apache Airflow on GCP across 6 Southeast Asian markets and built RAG-based conversational AI with multi-agent architectures.",
        "Passionate about the intersection of Big Data and AI/ML, I am dedicated to building scalable distributed systems, real-time data pipelines, and MLOps architectures that power next-generation intelligent applications.",
    ],
};

export const contactData = {
    description: "Thank you for visiting my personal portfolio website. Connect with me over socials.",
};

export const experienceData = [
    {
        role: "Customer Data Engineer",
        company: "Home Credit Vietnam",
        logo: "homecredit.svg",
        period: "Feb 2026 - Present",
        description:
            "Building and optimizing near-real-time customer data platforms for CRM and digital marketing. Specialized in streaming pipelines (Kafka, SAS ESP, Oracle PL/SQL) for real-time campaign targeting, developing automated PL/SQL code-generation tools, and designing GA4 anomaly detection platforms on GCP.",
        technologies: ["Oracle PL/SQL", "Apache Kafka", "RabbitMQ", "SAS ESP", "SAS RTDM", "BigQuery", "Dataform", "Cloud Run", "Power Automate", "Splunk", "Apache Hadoop", "Apache Spark"],
    },
    {
        role: "Data Engineer",
        company: "Hello Health Group",
        logo: "hhg.png",
        period: "Mar 2025 - Feb 2026",
        description:
            "Building and optimizing large-scale data pipelines for healthcare and marketing analytics across 6 Southeast Asian markets. Specialized in orchestrating complex ETL workflows with Apache Airflow on GCP, developing RAG-based conversational AI systems, and designing multi-agent architectures for business automation.",
        technologies: ["Apache Airflow", "GCP", "BigQuery", "Python", "Docker", "Kubernetes", "RAG", "Multi-Agent AI", "GSC", "GA4", "Google Cloud Run", "Google Cloud Storage", "Google Cloud Pub/Sub", "Google Compute Engine"],
    },
    {
        role: "Data Engineer Internship",
        company: "Amazon Web Services (AWS)",
        logo: "channels4_profile.jpg",
        period: "Jan 2025 - Mar 2025",
        description:
            "Completed AWS First Cloud Journey training program, studying core AWS services including Amazon EC2, S3, RDS, IAM, Lambda, and VPC through hands-on labs and practical exercises.",
        technologies: ["AWS", "EC2", "S3", "RDS", "Lambda", "IAM"],
    },
    {
        role: "Data Engineering Mentor",
        company: "TechData.AI",
        logo: "techdataai.jpeg",
        period: "Jul 2024 - Dec 2024",
        description:
            "Mentored 6 students in Data Engineering fundamentals and advanced topics including Python, Linux, Docker, Apache NiFi, Apache Airflow, Apache Spark, Apache Kafka, and Google Cloud Platform, achieving 85% course completion rate.",
        technologies: ["Python", "SQL", "Docker", "Apache Airflow", "Apache Spark", "Apache Kafka", "GCP"],
        // Only this entry showed its link on the previous site (as "View Portfolio").
        link: { label: "View Portfolio", url: "https://www.facebook.com/share/p/194g4gJ1NN/" },
    },
];

export const educationData = [
    {
        degree: "Bachelor of Engineer Science, Information Technology",
        school: "Ho Chi Minh City University of Technology and Education",
        period: "Aug 2021 – 2025",
        logo: "UTE.jpg",
        achievements: [
            "Specialization in Information Systems, focusing on data engineering and big data technologies.",
            "Relevant coursework: Database Management, Data Analysis, System Architecture, Advanced SQL, Data Warehousing, and Big Data Technologies.",
        ],
    },
];

export const certificationData = [
    {
        name: "AWS Academy Cloud Foundations",
        issuer: "AWS Academy",
        date: "Aug 2023 – Dec 2023",
        logo: "channels4_profile.jpg",
        description: "Understanding of AWS architecture, core services (EC2, S3, RDS) and cloud cost management.",
        link: "https://www.credly.com/badges/9b1264c8-8812-4b58-824d-babb30125434/linked_in_profile",
    },
    {
        name: "IBM Data Engineering Specialization",
        issuer: "Coursera",
        date: "Oct 2023 – Aug 2024",
        logo: "ibm.jpeg",
        description: "Data modeling, pipeline development, ETL processes, and data analysis using Python and SQL.",
        link: "https://coursera.org/share/3b696ea97307b4e452bc53f6f07162d0",
    },
    {
        name: "Samsung Innovation Campus - Big Data",
        issuer: "Samsung Innovation Campus - SIC",
        date: "May 2024 – Aug 2024",
        logo: "SIC.jpeg",
        description: "Big data processing with Hadoop, Spark, and data visualization techniques.",
        link: "https://drive.google.com/file/d/1YP8vD_ebBpvW22qe7llSPQoDtybvvqFm/view?usp=sharing",
    },
];

// Accent tone for a tech chip's dot. Accent colors live ONLY inside these small fragments.
const TONE_RULES = [
    [/\brag\b|agent/i, "sunglow"], // AI (\b so "Storage" doesn't match "rag")
    [/oracle|sql|bigquery|dataform|rds|s3/i, "amber"], // data stores & modeling
    [/kafka|rabbitmq|esp|rtdm|power automate/i, "blue"], // streaming, messaging & automation
    [/gcp|aws|cloud|compute engine|ec2|lambda|iam/i, "sky"], // cloud
];

export const toneFor = (label) => {
    const match = TONE_RULES.find(([pattern]) => pattern.test(label));
    return match ? match[1] : "lime"; // orchestration / compute (Airflow, Spark, Docker, ...)
};
