import { useItems } from "@directus/extensions-sdk";
import { ref } from "vue";

export function useVolumes() {
  async function getVolume(id) {
    const collectionRef = ref("Volumes");

    const query = {
      fields: ref(["*"]),
      limit: ref(1),
      sort: ref(null),
      search: ref(null),
      filter: ref(null),
      page: ref(1),
    };

    query.filter.value = { id: id };
    query.fields.value = [
      "slug",
      "title",
      "number",
      "published_at",
      "sections.title",
      "sections.id",
      "sections.position",
      "sections.articles.title",
      "sections.articles.authors.author_id.fullname",
    ];
    const { getItems, items } = useItems(collectionRef, query);

    await getItems();

    return items?.value[0];
  }
  return { getVolume };
}
