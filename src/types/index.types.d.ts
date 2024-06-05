import { Tab } from "./types";

export interface FooterNavLink {
	title: string;
	url: string;
	currentTab?: Tab;
}

export interface NavLink {
	title: string;
	url: string;
}

export interface TeamMember {
	id: number;
	name: string;
	image: string;
	intro: string;
	facebook: string;
	linkedin: string;
	twitter: string;
}

export interface FilterOption {
	id: number;
	title: string;
	value: string;
}

export interface Feature {
	icon: string;
	title: string;
	description: string;
}

export interface FaqOption {
	id: number;
	title: string;
	description: string;
	first_description?: string;
	second_description?: string;
}