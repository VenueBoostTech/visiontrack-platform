// api/external/omnigateway/types/submissions.ts
export enum SubmissionType {
    QUOTE = 'quote',
    CONTACT = 'contact',
    REQUEST_DEMO = 'request_demo',
    OTHER = 'other'
}

export interface BaseMetadata {
    timestamp: Date;
    ipHash: string;
    userAgent: string;
}

export interface ContactMetadata extends BaseMetadata {
    subject: string;
}

export interface RequestDemoMetadata extends BaseMetadata {
    companyName: string;
    businessType: string;
    teamSize: string;
    interestedFeatures: string[];
}

export type SubmissionMetadata = BaseMetadata | ContactMetadata | RequestDemoMetadata;

export interface SubmissionFormData {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    content?: string;
    type: SubmissionType;
    metadata?: SubmissionMetadata;
}