import { Card, Text, Stack, Button, Box } from "@sanity/ui";
import { useState, useEffect } from "react";

interface PreviewProps {
  document: {
    displayed: {
      _id: string;
      _type: string;
      slug?: {
        current: string;
      };
    };
  };
}

export default function TrailPreview(props: PreviewProps) {
  const { displayed } = props.document;
  const slug = displayed.slug?.current;

  // Use the document's slug for preview URL
  const url = slug ? `/trail/${slug}` : "";

  if (!slug) {
    return (
      <Card padding={4} tone="critical">
        <Text>Please add a slug to enable preview</Text>
      </Card>
    );
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Text size={2} weight="semibold">
              Trail Preview
            </Text>
            <Text size={1}>Preview URL: {url}</Text>
            <Button
              tone="primary"
              onClick={() => {
                window.open(`${window.location.origin}${url}`, "_blank");
              }}
              text="Open preview"
            />
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
