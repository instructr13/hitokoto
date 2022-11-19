import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Heading,
    ListItem,
    UnorderedList
} from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";

import ExternalLink from "@/components/elements/ExternalLink";

import AboutAccordionItem from "./AboutAccordionItem";

export interface AboutContentProps {
    authors: string[];
    license: string;
    modal?: boolean;
}

const AboutContent = ({ authors, license, modal }: AboutContentProps) => {
    const [formIsRandom] = useLocalStorageState("formIsRandom");

    return (
        <Container maxW={modal ? "md" : "2xl"}>
            <Accordion allowToggle>
                <AccordionItem>
                    <Heading as="h2" fontSize="lg">
                        <AccordionButton>
                            <Box flex={1} textAlign="left">
                                詳細
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        毎日の体調の記録を簡易化するアプリです。手動入力の代わりに、このアプリを通してわかりやすくデータを入力することができます。
                        <br />
                        毎日の体調の入力が少しでも煩わしく感じる人におすすめです。
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Accordion mt={4} allowToggle>
                <AboutAccordionItem label="バグを報告するには">
                    アプリになんらかのバグを見つけた場合は、
                    <ExternalLink href="https://github.com/instructr13/hitokoto/issues/new">GitHub</ExternalLink>
                    にて報告してください。新しい機能のアイデアも大歓迎です。Hitokoto
                    をよりよいものにするため、支援してくだされば幸いです。
                </AboutAccordionItem>
                <AboutAccordionItem label="プライバシーポリシー">
                    私達は、このアプリを通していかなるデータも収集しません。ログや設定、出力結果が外部に送信されることが一切ないことを保証します。
                </AboutAccordionItem>
                <AboutAccordionItem label="謝辞">
                    <Box ml={2}>
                        <Heading as="h3" fontSize="md">
                            作者
                        </Heading>
                        <UnorderedList ml={6}>
                            {authors.map((author, index) => (
                                <ListItem key={index}>{author}</ListItem>
                            ))}
                        </UnorderedList>
                    </Box>
                </AboutAccordionItem>
                <AboutAccordionItem label="ライセンス" rightElement={license}>
                    Hitokoto は
                    <ExternalLink href="https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2">
                        オープンソースソフトウェア
                    </ExternalLink>
                    です。誰もが貢献者になることができます！ソフトウェア開発の専門知識を持っていない方でも、なんらかのアイデアを提供してくださるだけで実装につながるかもしれません。
                </AboutAccordionItem>
                <AboutAccordionItem
                    label="ランダム生成モードについて"
                    visibility={formIsRandom ? "visible" : "collapse"}
                >
                    ランダム生成モードは
                    <ExternalLink href="https://ansaikuropedia.org/wiki/%E9%9D%A2%E5%80%92%E8%87%AD%E3%81%84">
                        際限まで楽をしたい
                    </ExternalLink>
                    <ExternalLink
                        fontWeight="bold"
                        href="https://ansaikuropedia.org/wiki/%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82!"
                    >
                        限られた人
                    </ExternalLink>
                    のための機能です。ノーマル生成モードの裏に作られ、私達の
                    <ExternalLink href="https://ja.wikipedia.org/wiki/%E3%82%AF%E3%82%AA%E3%83%AA%E3%83%86%E3%82%A3%E3%83%BB%E3%82%AA%E3%83%96%E3%83%BB%E3%83%A9%E3%82%A4%E3%83%95">
                        QoL
                    </ExternalLink>
                    のためにだいたい3時間くらいで作られました。
                    <br />
                    <br />
                    ナビゲーション上に表示されたキーバインドで瞬時にモード切り替えができます。
                </AboutAccordionItem>
            </Accordion>
        </Container>
    );
};

export default AboutContent;
