
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  fullDescription: string;
  xpRequirement: number;
  type: 'Full-time' | 'Part-time' | 'Contract';
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    companyLogo: "https://placehold.co/100x100.png",
    description: "Join our innovative team to build cutting-edge user interfaces with React and Next.js.",
    fullDescription: `
      <p>We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack. You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Developing new user-facing features using React.js</li>
        <li>Building reusable components and front-end libraries for future use</li>
        <li>Translating designs and wireframes into high-quality code</li>
        <li>Optimizing components for maximum performance across a vast array of web-capable devices and browsers</li>
      </ul>
      <h4 class="font-semibold mt-4 mb-2">Qualifications:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
        <li>Thorough understanding of React.js and its core principles</li>
        <li>Experience with popular React.js workflows (such as Flux or Redux)</li>
        <li>Familiarity with modern front-end build pipelines and tools</li>
      </ul>
    `,
    xpRequirement: 100,
    type: 'Full-time',
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Data Systems Co.",
    companyLogo: "https://placehold.co/100x100.png",
    description: "Design and maintain scalable backend services and APIs using Node.js and PostgreSQL.",
    fullDescription: `
      <p>Data Systems Co. is seeking a Backend Engineer to help build the next generation of our platform. You will work on designing, developing, and deploying backend services with a focus on high availability, low latency, and scalability.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Design and implement RESTful APIs for our web and mobile applications.</li>
        <li>Build and maintain efficient, reusable, and reliable backend code.</li>
        <li>Integrate with third-party services and databases.</li>
        <li>Ensure the performance, quality, and responsiveness of applications.</li>
      </ul>
       <h4 class="font-semibold mt-4 mb-2">Qualifications:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Proven experience as a Backend Engineer.</li>
        <li>In-depth knowledge of Node.js and frameworks available for it.</li>
        <li>Experience with database technology such as PostgreSQL, MySQL, or MongoDB.</li>
        <li>Familiarity with cloud services (AWS, Google Cloud, Azure).</li>
      </ul>
    `,
    xpRequirement: 200,
    type: 'Full-time',
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Creative Minds LLC",
    companyLogo: "https://placehold.co/100x100.png",
    description: "Create compelling and user-friendly designs for our web and mobile applications.",
    fullDescription: `
       <p>Creative Minds LLC is looking for a talented UI/UX Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional user interfaces.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals and experience.</li>
        <li>Execute all visual design stages from concept to final hand-off to engineering.</li>
        <li>Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas.</li>
      </ul>
       <h4 class="font-semibold mt-4 mb-2">Qualifications:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Proven UI/UX design experience.</li>
        <li>Strong portfolio of design projects.</li>
        <li>Proficiency in Figma, Sketch, or other visual design and wire-framing tools.</li>
        <li>Excellent visual design skills with sensitivity to user-system interaction.</li>
      </ul>
    `,
    xpRequirement: 50,
    type: 'Contract',
  },
];
