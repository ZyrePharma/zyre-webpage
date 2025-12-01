import type { Schema, Struct } from '@strapi/strapi';

export interface BenefitBenefits extends Struct.ComponentSchema {
  collectionName: 'components_benefit_benefits';
  info: {
    displayName: 'benefits';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ContactContact extends Struct.ComponentSchema {
  collectionName: 'components_contact_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    type: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface DistributorDistributor extends Struct.ComponentSchema {
  collectionName: 'components_distributor_distributors';
  info: {
    displayName: 'Distributor';
  };
  attributes: {
    address: Schema.Attribute.String;
    contact: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ProductPharmaceuticalDetail extends Struct.ComponentSchema {
  collectionName: 'components_product_pharmaceutical_details';
  info: {
    description: 'Pharmaceutical information section for products';
    displayName: 'Product Detail';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'benefit.benefits': BenefitBenefits;
      'contact.contact': ContactContact;
      'distributor.distributor': DistributorDistributor;
      'product.pharmaceutical-detail': ProductPharmaceuticalDetail;
    }
  }
}
