export const getPopulateParams = (collection: string, lang: string) => {
    switch (collection) {
        case "/topics":
            return topicParams;
        case "/muzes":
            return MuseumParams;
        case "/encyclopedias":
            return EncyclopediaParams;   
        case "/authors":
            return AuthorParams;    
        default:
            return topicParams;
    }
};

export const getPageSlug = (collection: string) => {
  switch (collection) {
    case "/topics":
        return "topic-page";
    case "/muzes":
        return "museum-page";
    case "/encyclopedias":
        return "encyclopedia-page";    
    default:
      return "topic-page";
  }
}

const topicParams = {
    fields: ["title", "slug", "QuickTable", "TopicKeywords", "isBlogText", "createdBy", "content"],
    CoverImage: {
      populate: {
        coverImage: {
          populate: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          }
        },
      }
    },
    QuickTable: {
      populate: {
        fields: ["title", "content"],
        content: {
          populate: {
            fields: ["label", "value"]
          }
        }
      }
    },
    recomended_topics: {
      populate: {
        fields: ["title", "slug", "QuickTable", "TopicKeywords", "isBlogText", "createdBy", "content"],
        CoverImage: {
          populate: {
            coverImage: {
              populate: {
                fields: ["url", "alternativeText", "caption", "width", "height"],
              }
            },
          }
        },
        QuickTable: {
          populate: {
            fields: ["title", "content"],
            content: {
              populate: {
                fields: ["label", "value"]
              }
            }
          }
        }
      }
    },
    author: {
      populate: {
        fields: ["name", "slug", "about"],
        image: {
          populate: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          }
        },
        topics: {
          populate: {
            fields: ["title", "slug", "QuickTable", "TopicKeywords", "isBlogText", "createdBy", "content"],
            CoverImage: {
              populate: {
                coverImage: {
                  fields: ["url", "alternativeText", "caption", "width", "height"],
                },
              }
            },
            QuickTable: {
              populate: {
                fields: ["title", "content"],
                content: {
                  populate: {
                    fields: ["label", "value"]
                  }
                }
              }
            },
            author: {
              populate: {
                fields: ["name", "slug", "about"],
                image: {
                  populate: {
                    fields: ["url", "alternativeText", "caption", "width", "height"],
                  }
                }
              }
            }
          },
        },
      }
    }
};
const MuseumParams = {
    fields: ["name", "slug", "description", "shortDesc", "notes", "visitStartTime", "visitEndTime", "googleMapsUrl", "addressText"],
    coverImage: {
      populate: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      }
    },
    topics: {
      populate: {
        ...topicParams
      }
    }
};
const EncyclopediaParams = {
  fields: ["slug", "name", "desc", "shortDesc"],
  topics: {
    populate: {
      ...topicParams
    }
  },
  coverImage: {
    populate: {
      fields: ["url", "alternativeText", "caption", "width", "height"],
    }
  }
};
const AuthorParams = {
  fields: ["name", "slug", "about"],
  image: {
    populate: {
      fields: ["url", "alternativeText", "caption", "width", "height"],
    }
  },
  topics: {
    ...topicParams,
  }
};
export const blogParams = {
  fields: ["title", "slug", "QuickTable", "TopicKeywords", "isBlogText", "createdBy", "content"],
  CoverImage: {
    populate: {
      coverImage: {
        populate: {
          fields: ["url", "alternativeText", "caption", "width", "height"],
        }
      },
    }
  },
  QuickTable: {
    populate: {
      fields: ["title", "content"],
      content: {
        populate: {
          fields: ["label", "value"]
        }
      }
    }
  },
  recomended_topics: {
    populate: {
      fields: ["title", "slug", "QuickTable", "TopicKeywords", "isBlogText", "createdBy", "content"],
      CoverImage: {
        populate: {
          coverImage: {
            populate: {
              fields: ["url", "alternativeText", "caption", "width", "height"],
            }
          },
        }
      },
      QuickTable: {
        populate: {
          fields: ["title", "content"],
          content: {
            populate: {
              fields: ["label", "value"]
            }
          }
        }
      },
    }
  },
  // author: {
  //   populate: {
  //     fields: ["name", "slug", "about"],
  //     image: {
  //       populate: {
  //         fields: ["url", "alternativeText", "caption", "width", "height"],
  //       }
  //     },
  //     topics: {
  //       populate: {
  //         fields: ["title", "slug", "QuickTable", "TopicKeywords", "isBlogText", "createdBy", "content"],
  //         CoverImage: {
  //           populate: {
  //             coverImage: {
  //               fields: ["url", "alternativeText", "caption", "width", "height"],
  //             },
  //           }
  //         },
  //         QuickTable: {
  //           populate: {
  //             fields: ["title", "content"],
  //             content: {
  //               populate: {
  //                 fields: ["label", "value"]
  //               }
  //             }
  //           }
  //         },
  //         author: {
  //           populate: {
  //             fields: ["name", "slug", "about"],
  //             image: {
  //               populate: {
  //                 fields: ["url", "alternativeText", "caption", "width", "height"],
  //               }
  //             }
  //           }
  //         }
  //       },
  //     },
  //   }
  // }
};